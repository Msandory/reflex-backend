import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { DeliveryRequestsService } from './delivery_requests.service.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';


interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    role: string;
  };
}
@Controller('delivery-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeliveryRequestsController {
  constructor(
    private readonly deliveryRequestsService: DeliveryRequestsService,
  ) {}

  @Get()
  @Roles(Role.SystemAdmin, Role.Dispatcher, Role.Retailer, Role.Rider)
  findAll(@Req() req: AuthenticatedRequest) {
    return this.deliveryRequestsService.findAllForUser(req.user);
  }

  @Get(':id')
  @Roles(Role.SystemAdmin, Role.Dispatcher, Role.Retailer, Role.Rider)
  findOne(@Param('id') id: string) {
    return this.deliveryRequestsService.findOne(id);
  }

  @Post()
  @Roles(Role.SystemAdmin, Role.Retailer)
  create(@Body() data: Prisma.delivery_requestsCreateInput) {
    return this.deliveryRequestsService.create(data);
  }

  @Patch(':id')
  @Roles(Role.SystemAdmin, Role.Dispatcher, Role.Rider)
  update(
    @Param('id') id: string,
    @Body() data: Prisma.delivery_requestsUpdateInput,
  ) {
    return this.deliveryRequestsService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.SystemAdmin)
  remove(@Param('id') id: string) {
    return this.deliveryRequestsService.remove(id);
  }
}