import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CustomersModule } from './customers/customers.module.js';
import { DeliveryRequestsModule } from './delivery_requests/delivery_requests.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProofOfDeliveryModule } from './proof_of_delivery/proof_of_delivery.module.js';
import { StatusLogsModule } from './status_logs/status_logs.module.js';
import { SyncEventsModule } from './sync_events/sync_events.module.js';
import { UsersModule } from './users/users.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    PrismaModule,
    CustomersModule,
    DeliveryRequestsModule,
    ProofOfDeliveryModule,
    StatusLogsModule,
    SyncEventsModule,
    UsersModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'reflex-backend',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
