import { Module } from '@nestjs/common';
import { CuentasController } from './cuentas.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CUENTA_SERVICE, envs } from 'src/config';

@Module({
  controllers: [CuentasController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: CUENTA_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.cuentasMicroserviceHost,
          port: envs.cuentasMicroservicePort,
        },
      },
    ]),
  ],
})
export class CuentasModule {}
