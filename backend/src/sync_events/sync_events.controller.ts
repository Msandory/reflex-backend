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
import { SyncEventsService } from './sync_events.service.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';

@Controller('sync-events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SyncEventsController {
  constructor(private readonly syncEventsService: SyncEventsService) {}

  @Get()
@Roles(Role.SystemAdmin, Role.Dispatcher)
findAll(){
    return this.syncEventsService.findAll();
  }

  @Get(':id')
@Roles(Role.SystemAdmin, Role.Dispatcher)
  findOne(@Param('id') id: string) {
    return this.syncEventsService.findOne(id);
  }

@Post()
@Roles(Role.SystemAdmin)
  create(@Body() data: Prisma.sync_eventsCreateInput) {
    return this.syncEventsService.create(data);
  }

 @Patch(':id')
@Roles(Role.SystemAdmin)
  update(
    @Param('id') id: string,
    @Body() data: Prisma.sync_eventsUpdateInput,
  ) {
    return this.syncEventsService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.SystemAdmin)
  remove(@Param('id') id: string) {
    return this.syncEventsService.remove(id);
  }
}