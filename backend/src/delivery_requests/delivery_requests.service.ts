import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Role } from '../auth/enums/role.enum.js';

@Injectable()
export class DeliveryRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllForUser(user: { userId: string; role: string }) {
    let where = {};

   
    switch (user.role) {
      case Role.SystemAdmin:
        where = {}; // no filter — sees everything
        break;
      case Role.Dispatcher:
        where = {}; // dispatcher needs visibility to assign riders — adjust if you want it scoped differently
        break;
      case Role.Retailer:
        where = { created_by: user.userId };
        break;
      case Role.Rider:
        where = { assigned_rider_id: user.userId };
        break;
      default:
        where = { id: 'no-match' }; // unknown role -> sees nothing, fails safe
    }

    const requests = await this.prisma.delivery_requests.findMany({
      where,
      include: { customers: true },
    });
    return requests.map(req => ({
      ...req,
      customer_name: req.customers?.name,
      address: req.customers?.address,
      phone: req.customers?.phone,
    }));
  }

  findOne(id: string) {
    return this.prisma.delivery_requests.findUnique({ where: { id }, include: { customers: true } });
  }

  async create(data: any) {
    const { customer_name, address, phone, customer_id, ...rest } = data;

    let resolvedCustomerId = customer_id;

    if (resolvedCustomerId) {
      // A customer_id was passed in — make sure it actually exists before trusting it
      const existing = await this.prisma.customers.findUnique({
        where: { id: resolvedCustomerId },
      });
      if (!existing) {
        resolvedCustomerId = null; // fall through to lookup/create below
      }
    }

    if (!resolvedCustomerId && phone) {
      // No valid id given — try to match an existing customer by phone
      const existingByPhone = await this.prisma.customers.findFirst({
        where: { phone },
      });
      if (existingByPhone) {
        resolvedCustomerId = existingByPhone.id;
      }
    }

    if (!resolvedCustomerId) {
      // Genuinely new customer — create one
      resolvedCustomerId = `cust-${Date.now().toString().slice(-4)}`;
      await this.prisma.customers.create({
        data: {
          id: resolvedCustomerId,
          name: customer_name || 'Unknown',
          address: address || 'Unknown',
          phone: phone || '',
        },
      });
    }

    const newRequest = await this.prisma.delivery_requests.create({
      data: {
        ...rest,
        customer_id: resolvedCustomerId,
      },
      include: { customers: true },
    });

    return {
      ...newRequest,
      customer_name: newRequest.customers?.name,
      address: newRequest.customers?.address,
      phone: newRequest.customers?.phone,
    };
  }

  async update(id: string, data: Prisma.delivery_requestsUpdateInput) {
    if (data.status === 'delivered') {
      const request = await this.prisma.delivery_requests.findUnique({ where: { id } });
      if (request?.assigned_rider_id) {
        return this.prisma.$transaction([
          this.prisma.delivery_requests.update({ where: { id }, data }),
          this.prisma.users.update({
            where: { id: request.assigned_rider_id },
            data: { points: { increment: 50 } },
          }),
        ]).then((res) => res[0]);
      }
    }
    return this.prisma.delivery_requests.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.delivery_requests.delete({ where: { id } });
  }
}