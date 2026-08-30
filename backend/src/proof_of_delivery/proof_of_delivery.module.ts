import { Module } from '@nestjs/common';
import { ProofOfDeliveryController } from './proof_of_delivery.controller.js';
import { ProofOfDeliveryService } from './proof_of_delivery.service.js';

@Module({
  controllers: [ProofOfDeliveryController],
  providers: [ProofOfDeliveryService],
})
export class ProofOfDeliveryModule {}
