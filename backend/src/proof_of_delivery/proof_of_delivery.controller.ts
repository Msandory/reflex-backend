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
import { ProofOfDeliveryService } from './proof_of_delivery.service.js';

@Controller('proof-of-delivery')
export class ProofOfDeliveryController {
  constructor(
    private readonly proofOfDeliveryService: ProofOfDeliveryService,
  ) {}

  @Get()
  findAll() {
    return this.proofOfDeliveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proofOfDeliveryService.findOne(id);
  }

  @Post()
  create(@Body() data: Prisma.proof_of_deliveryCreateInput) {
    return this.proofOfDeliveryService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.proof_of_deliveryUpdateInput,
  ) {
    return this.proofOfDeliveryService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proofOfDeliveryService.remove(id);
  }
}
