import { Module } from '@nestjs/common';
import { DeliveryRequestsController } from './delivery_requests.controller.js';
import { DeliveryRequestsService } from './delivery_requests.service.js';

@Module({
  controllers: [DeliveryRequestsController],
  providers: [DeliveryRequestsService],
})
export class DeliveryRequestsModule {}
