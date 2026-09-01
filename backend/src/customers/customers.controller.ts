import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { CustomersService } from './customers.service.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';

@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('search')
  @Roles(Role.SystemAdmin, Role.Dispatcher, Role.Retailer)
  search(@Query('q') q: string) {
    return this.customersService.search(q || '');
  }
  @Get()
  @Roles(Role.SystemAdmin, Role.Dispatcher, Role.Retailer)
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @Roles(Role.SystemAdmin, Role.Dispatcher, Role.Retailer)
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  @Roles(Role.SystemAdmin, Role.Retailer)
  create(@Body() data: Prisma.customersCreateInput) {
    return this.customersService.create(data);
  }

  @Patch(':id')
  @Roles(Role.SystemAdmin, Role.Retailer)
  update(
    @Param('id') id: string,
    @Body() data: Prisma.customersUpdateInput,
  ) {
    return this.customersService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.SystemAdmin)
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
 
}