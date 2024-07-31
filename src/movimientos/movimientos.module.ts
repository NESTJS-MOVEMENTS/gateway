import { Module } from '@nestjs/common';
import { MovimientosController } from './movimientos.controller';
import { NatsModule } from '../nats/nats.module';

@Module({
  controllers: [MovimientosController],
  providers: [],
  imports: [NatsModule],
})
export class MovimientosModule {}
