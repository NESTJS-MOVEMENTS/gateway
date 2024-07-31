import { Module } from '@nestjs/common';
import { CuentasController } from './cuentas.controller';
import { NatsModule } from '../nats/nats.module';

@Module({
  controllers: [CuentasController],
  providers: [],
  imports: [NatsModule],
})
export class CuentasModule {}
