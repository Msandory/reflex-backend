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
import { StatusLogsService } from './status_logs.service.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';

@Controller('status-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StatusLogsController {
  constructor(private readonly statusLogsService: StatusLogsService) {}

  @Get()
  @Roles(Role.SystemAdmin, Role.Dispatcher)
  findAll() {
    return this.statusLogsService.findAll();
  }

  @Get(':id')
  @Roles(Role.SystemAdmin, Role.Dispatcher)
  findOne(@Param('id') id: string) {
    return this.statusLogsService.findOne(id);
  }

  @Get(':id')
@Roles(Role.SystemAdmin, Role.Dispatcher)
  create(@Body() data: Prisma.status_logsCreateInput) {
    return this.statusLogsService.create(data);
  }

  @Patch(':id')
  @Roles(Role.SystemAdmin)
  update(
    @Param('id') id: string,
    @Body() data: Prisma.status_logsUpdateInput,
  ) {
    return this.statusLogsService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.SystemAdmin)
  remove(@Param('id') id: string) {
    return this.statusLogsService.remove(id);
  }
}