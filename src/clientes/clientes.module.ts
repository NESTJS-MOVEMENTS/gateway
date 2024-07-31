import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { NatsModule } from '../nats/nats.module';
@Module({
  controllers: [ClientesController],
  providers: [],
  imports: [NatsModule],
})
export class ClientesModule {}
