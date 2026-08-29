import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { SyncEventsService } from './sync_events.service.js';

@Controller('sync-events')
export class SyncEventsController {
  constructor(private readonly syncEventsService: SyncEventsService) {}

  @Get()
  findAll() {
    return this.syncEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.syncEventsService.findOne(id);
  }

  @Post()
  create(@Body() data: Prisma.sync_eventsCreateInput) {
    return this.syncEventsService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.sync_eventsUpdateInput,
  ) {
    return this.syncEventsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.syncEventsService.remove(id);
  }
}
