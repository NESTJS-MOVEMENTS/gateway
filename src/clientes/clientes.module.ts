import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTE_SERVICE, envs } from 'src/config';
@Module({
  controllers: [ClientesController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: CLIENTE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.clientesMicroserviceHost,
          port: envs.clientesMicroservicePort,
        },
      },
    ]),
  ],
})
export class ClientesModule {}
