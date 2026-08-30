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
import { StatusLogsService } from './status_logs.service.js';

@Controller('status-logs')
export class StatusLogsController {
  constructor(private readonly statusLogsService: StatusLogsService) {}

  @Get()
  findAll() {
    return this.statusLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusLogsService.findOne(id);
  }

  @Post()
  create(@Body() data: Prisma.status_logsCreateInput) {
    return this.statusLogsService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.status_logsUpdateInput,
  ) {
    return this.statusLogsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusLogsService.remove(id);
  }
}
