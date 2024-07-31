import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { PaginationDto } from '../common';
import { catchError } from 'rxjs';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(
    //?Configuracion para TCP
    // @Inject(CLIENTE_SERVICE) private readonly clienteClient: ClientProxy,
    //?Configuracion para NATS
    @Inject(NATS_SERVICE) private readonly clienteClient: ClientProxy,
  ) {}
  @Post()
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    //return createClienteDto;
    return this.clienteClient
      .send({ cmd: 'create_cliente' }, createClienteDto)
      .pipe(
        //para atrapar el Rpc error message que viene desde el microservicio.
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get()
  getClientes(@Query() paginationDto: PaginationDto) {
    console.log('entro por aqui');
    return this.clienteClient
      .send({ cmd: 'find_all_clientes' }, paginationDto)
      .pipe(
        //para atrapar el Rpc error message que viene desde el microservicio.
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get(':identificacion')
  getClienteById(@Param('identificacion') identificacion: string) {
    return this.clienteClient
      .send({ cmd: 'find_one_cliente' }, { identificacion: identificacion })
      .pipe(
        //para atrapar el Rpc error message que viene desde el microservicio.
        catchError((error) => {
          //console.log(error);
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':identificacion')
  updateCliente(
    @Param('identificacion') identificacion: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    //El id es el que viene por param
    //console.log({ id, ...updateClienteDto });
    return this.clienteClient
      .send(
        { cmd: 'update_cliente' },
        { ...updateClienteDto, identificacion: identificacion },
      )
      .pipe(
        //para atrapar el Rpc error message que viene desde el microservicio.
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':identificacion')
  deleteCliente(@Param('identificacion') identificacion: string) {
    return this.clienteClient
      .send({ cmd: 'delete_cliente' }, { identificacion: identificacion })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
