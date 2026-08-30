import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.customers.findMany();
  }

  findOne(id: string) {
    return this.prisma.customers.findUnique({ where: { id } });
  }

  create(data: Prisma.customersCreateInput) {
    return this.prisma.customers.create({ data });
  }

  update(id: string, data: Prisma.customersUpdateInput) {
    return this.prisma.customers.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.customers.delete({ where: { id } });
  }
}
