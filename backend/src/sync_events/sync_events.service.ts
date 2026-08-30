import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SyncEventsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.sync_events.findMany();
  }

  findOne(id: string) {
    return this.prisma.sync_events.findUnique({ where: { id } });
  }

  create(data: Prisma.sync_eventsCreateInput) {
    return this.prisma.sync_events.create({ data });
  }

  update(id: string, data: Prisma.sync_eventsUpdateInput) {
    return this.prisma.sync_events.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.sync_events.delete({ where: { id } });
  }
}
