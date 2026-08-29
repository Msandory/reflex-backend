import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class StatusLogsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.status_logs.findMany();
  }

  findOne(id: string) {
    return this.prisma.status_logs.findUnique({ where: { id } });
  }

  create(data: Prisma.status_logsCreateInput) {
    return this.prisma.status_logs.create({ data });
  }

  update(id: string, data: Prisma.status_logsUpdateInput) {
    return this.prisma.status_logs.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.status_logs.delete({ where: { id } });
  }
}
