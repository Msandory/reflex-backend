import { Module } from '@nestjs/common';
import { SyncEventsController } from './sync_events.controller.js';
import { SyncEventsService } from './sync_events.service.js';

@Module({
  controllers: [SyncEventsController],
  providers: [SyncEventsService],
})
export class SyncEventsModule {}
