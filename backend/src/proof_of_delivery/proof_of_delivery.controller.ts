import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { ProofOfDeliveryService } from './proof_of_delivery.service.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';

@Controller('proof-of-delivery')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProofOfDeliveryController {
  constructor(
    private readonly proofOfDeliveryService: ProofOfDeliveryService,
  ) {}

  @Get()
  @Roles(Role.SystemAdmin, Role.Dispatcher, Role.Retailer)
  findAll() {
    return this.proofOfDeliveryService.findAll();
  }

  @Get(':id')
  @Roles(Role.SystemAdmin, Role.Dispatcher, Role.Retailer, Role.Rider)
  findOne(@Param('id') id: string) {
    return this.proofOfDeliveryService.findOne(id);
  }

  @Post()
  @Roles(Role.SystemAdmin, Role.Rider)
  create(@Body() data: Prisma.proof_of_deliveryCreateInput) {
    return this.proofOfDeliveryService.create(data);
  }

  @Patch(':id')
  @Roles(Role.SystemAdmin, Role.Rider)
  update(
    @Param('id') id: string,
    @Body() data: Prisma.proof_of_deliveryUpdateInput,
  ) {
    return this.proofOfDeliveryService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.SystemAdmin)
  remove(@Param('id') id: string) {
    return this.proofOfDeliveryService.remove(id);
  }
}