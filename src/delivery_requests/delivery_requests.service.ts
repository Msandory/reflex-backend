import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DeliveryRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const requests = await this.prisma.delivery_requests.findMany({
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
    
    // Auto-generate a new customer for every request for demo purposes
    const newCustomerId = `cust-${Date.now().toString().slice(-4)}`;

    await this.prisma.customers.create({
      data: {
        id: newCustomerId,
        name: customer_name || 'Unknown',
        address: address || 'Unknown',
        phone: phone || '',
      }
    });

    const newRequest = await this.prisma.delivery_requests.create({ 
      data: {
        ...rest,
        customer_id: newCustomerId
      },
      include: { customers: true }
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
