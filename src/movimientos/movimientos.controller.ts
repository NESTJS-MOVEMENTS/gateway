import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { MOVIMIENTO_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('movimientos')
export class MovimientosController {
  constructor(
    @Inject(MOVIMIENTO_SERVICE) private readonly movimientoClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientoClient
      .send({ cmd: 'registraMovimiento' }, createMovimientoDto)
      .pipe(
        //para atrapar el Rpc error message que viene desde el microservicio.
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
    //return createMovimientoDto;
  }
}