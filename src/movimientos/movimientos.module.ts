import { Module } from '@nestjs/common';
import { MovimientosController } from './movimientos.controller';
import { envs, MOVIMIENTO_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [MovimientosController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: MOVIMIENTO_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.movimientosMicroserviceHost,
          port: envs.movimientosMicroservicePort,
        },
      },
    ]),
  ],
})
export class MovimientosModule {}
