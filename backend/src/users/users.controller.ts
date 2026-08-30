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
import { UsersService } from './users.service.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.SystemAdmin, Role.Dispatcher)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.SystemAdmin, Role.Dispatcher)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Roles(Role.SystemAdmin)
  create(@Body() data: Prisma.usersCreateInput) {
    return this.usersService.create(data);
  }

  @Patch(':id')
  @Roles(Role.SystemAdmin)
  update(
    @Param('id') id: string,
    @Body() data: Prisma.usersUpdateInput,
  ) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.SystemAdmin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}