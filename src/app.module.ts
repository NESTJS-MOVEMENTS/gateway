import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { CuentasModule } from './cuentas/cuentas.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { ReportesModule } from './reportes/reportes.module';
@Module({
  imports: [ClientesModule, CuentasModule, MovimientosModule, ReportesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
