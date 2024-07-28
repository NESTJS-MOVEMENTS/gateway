import {
  Controller,
  Post,
  Body,
  Inject,
  Patch,
  ParseIntPipe,
  Param,
  Get,
} from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { CUENTA_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { EstadoCuentaDto } from './dto/status-cuenta.dto';

@Controller('cuentas')
export class CuentasController {
  constructor(
    @Inject(CUENTA_SERVICE) private readonly cuentaClient: ClientProxy,
  ) {}
  @Post()
  create(@Body() createCuentaDto: CreateCuentaDto) {
    return this.cuentaClient
      .send({ cmd: 'createCuenta' }, createCuentaDto)
      .pipe(
        //para atrapar el Rpc error message que viene desde el microservicio.
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.cuentaClient
      .send({ cmd: 'findOneCuentaById' }, { id: id })
      .pipe(
        //para atrapar el Rpc error message que viene desde el microservicio.
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':id')
  changeCuentaStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() estadoCuentaDto: EstadoCuentaDto,
  ) {
    //return { id, ...estadoCuentaDto };
    return this.cuentaClient
      .send({ cmd: 'changeCuentaStatus' }, { id, ...estadoCuentaDto })
      .pipe(
        //para atrapar el Rpc error message que viene desde el microservicio.
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
