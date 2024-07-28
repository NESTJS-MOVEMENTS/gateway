import { Module } from '@nestjs/common';
import { ReportesController } from './reportes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, REPORTE_SERVICE } from 'src/config';

@Module({
  controllers: [ReportesController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: REPORTE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.reportesMicroserviceHost,
          port: envs.reportesMicroservicePort,
        },
      },
    ]),
  ],
})
export class ReportesModule {}
