import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  //?Con nats ya no es necesario la configuracion de HOST y PORTS
  // CLIENTES_MICROSERVICE_HOST: string;
  // CLIENTES_MICROSERVICE_PORT: number;
  // CUENTAS_MICROSERVICE_HOST: string;
  // CUENTAS_MICROSERVICE_PORT: number;
  // MOVIMIENTOS_MICROSERVICE_HOST: string;
  // MOVIMIENTOS_MICROSERVICE_PORT: number;
  // REPORTES_MICROSERVICE_HOST: string;
  // REPORTES_MICROSERVICE_PORT: number;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    //?Con nats ya no es necesario la configuracion de HOST y PORTS
    // CLIENTES_MICROSERVICE_HOST: joi.string().required(),
    // CLIENTES_MICROSERVICE_PORT: joi.number().required(),
    // CUENTAS_MICROSERVICE_HOST: joi.string().required(),
    // CUENTAS_MICROSERVICE_PORT: joi.number().required(),
    // MOVIMIENTOS_MICROSERVICE_HOST: joi.string().required(),
    // MOVIMIENTOS_MICROSERVICE_PORT: joi.number().required(),
    // REPORTES_MICROSERVICE_HOST: joi.string().required(),
    // REPORTES_MICROSERVICE_PORT: joi.number().required(),
    //Validamos como array
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  //sobre escribimos la propiedad del objeto NATS_SERVERS con el nuevo valor. El split devuelve un array
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  //?Con nats ya no es necesario la configuracion de HOST y PORTS
  // clientesMicroserviceHost: envVars.CLIENTES_MICROSERVICE_HOST,
  // clientesMicroservicePort: envVars.CLIENTES_MICROSERVICE_PORT,
  // cuentasMicroserviceHost: envVars.CUENTAS_MICROSERVICE_HOST,
  // cuentasMicroservicePort: envVars.CUENTAS_MICROSERVICE_PORT,
  // movimientosMicroserviceHost: envVars.MOVIMIENTOS_MICROSERVICE_HOST,
  // movimientosMicroservicePort: envVars.MOVIMIENTOS_MICROSERVICE_PORT,
  // reportesMicroserviceHost: envVars.MOVIMIENTOS_MICROSERVICE_HOST,
  // reportesMicroservicePort: envVars.MOVIMIENTOS_MICROSERVICE_PORT,

  natServers: envVars.NATS_SERVERS,
};
