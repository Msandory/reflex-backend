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

  async search(query: string) {
  return this.prisma.customers.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { phone: { contains: query } },
      ],
    },
    take: 5,
  });
}

async findOrCreate(name: string, phone: string, address: string) {
  const existing = await this.prisma.customers.findFirst({ where: { phone } });
  if (existing) return existing;
  return this.prisma.customers.create({
    data: { id: Date.now().toString().slice(-10), name, phone, address },
  });
}
}
