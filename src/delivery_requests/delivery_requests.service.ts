import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DeliveryRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.delivery_requests.findMany();
  }

  findOne(id: string) {
    return this.prisma.delivery_requests.findUnique({ where: { id } });
  }

  create(data: Prisma.delivery_requestsCreateInput) {
    return this.prisma.delivery_requests.create({ data });
  }

  update(id: string, data: Prisma.delivery_requestsUpdateInput) {
    return this.prisma.delivery_requests.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.delivery_requests.delete({ where: { id } });
  }
}
