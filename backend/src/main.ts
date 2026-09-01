import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.enableCors();
  (BigInt.prototype as any).toJSON = function () {
  return Number(this);
};
  await app.listen(process.env.PORT ?? 3200);
}
await bootstrap();
