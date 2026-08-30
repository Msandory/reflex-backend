import { Module } from '@nestjs/common';
import { StatusLogsController } from './status_logs.controller.js';
import { StatusLogsService } from './status_logs.service.js';

@Module({
  controllers: [StatusLogsController],
  providers: [StatusLogsService],
})
export class StatusLogsModule {}
