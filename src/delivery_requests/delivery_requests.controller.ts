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
import { DeliveryRequestsService } from './delivery_requests.service.js';

@Controller('delivery-requests')
export class DeliveryRequestsController {
  constructor(
    private readonly deliveryRequestsService: DeliveryRequestsService,
  ) {}

  @Get()
  findAll() {
    return this.deliveryRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryRequestsService.findOne(id);
  }

  @Post()
  create(@Body() data: Prisma.delivery_requestsCreateInput) {
    return this.deliveryRequestsService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.delivery_requestsUpdateInput,
  ) {
    return this.deliveryRequestsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryRequestsService.remove(id);
  }
}
