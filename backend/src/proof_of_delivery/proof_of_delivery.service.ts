import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProofOfDeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.proof_of_delivery.findMany();
  }

  findOne(id: string) {
    return this.prisma.proof_of_delivery.findUnique({ where: { id } });
  }

  create(data: Prisma.proof_of_deliveryCreateInput) {
    return this.prisma.proof_of_delivery.create({ data });
  }

  update(id: string, data: Prisma.proof_of_deliveryUpdateInput) {
    return this.prisma.proof_of_delivery.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.proof_of_delivery.delete({ where: { id } });
  }
}
