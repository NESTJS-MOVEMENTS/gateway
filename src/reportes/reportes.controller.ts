import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { REPORTE_SERVICE } from 'src/config';
import { ParamsReporte } from './dto/params-reporte.dto';
import { catchError } from 'rxjs';

@Controller('reportes')
export class ReportesController {
  constructor(
    @Inject(REPORTE_SERVICE) private readonly reporteClient: ClientProxy,
  ) {}
  @Get()
  findAll(@Query() parametros: ParamsReporte) {
    return this.reporteClient
      .send({ cmd: 'reporteMovimientos' }, parametros)
      .pipe(
        //para atrapar el Rpc error message que viene desde el microservicio.
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
    //return parametros;
  }
}
