import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  CLIENTES_MICROSERVICE_HOST: string;
  CLIENTES_MICROSERVICE_PORT: number;
  CUENTAS_MICROSERVICE_HOST: string;
  CUENTAS_MICROSERVICE_PORT: number;
  MOVIMIENTOS_MICROSERVICE_HOST: string;
  MOVIMIENTOS_MICROSERVICE_PORT: number;
  REPORTES_MICROSERVICE_HOST: string;
  REPORTES_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    CLIENTES_MICROSERVICE_HOST: joi.string().required(),
    CLIENTES_MICROSERVICE_PORT: joi.number().required(),
    CUENTAS_MICROSERVICE_HOST: joi.string().required(),
    CUENTAS_MICROSERVICE_PORT: joi.number().required(),
    MOVIMIENTOS_MICROSERVICE_HOST: joi.string().required(),
    MOVIMIENTOS_MICROSERVICE_PORT: joi.number().required(),
    REPORTES_MICROSERVICE_HOST: joi.string().required(),
    REPORTES_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  clientesMicroserviceHost: envVars.CLIENTES_MICROSERVICE_HOST,
  clientesMicroservicePort: envVars.CLIENTES_MICROSERVICE_PORT,
  cuentasMicroserviceHost: envVars.CUENTAS_MICROSERVICE_HOST,
  cuentasMicroservicePort: envVars.CUENTAS_MICROSERVICE_PORT,
  movimientosMicroserviceHost: envVars.MOVIMIENTOS_MICROSERVICE_HOST,
  movimientosMicroservicePort: envVars.MOVIMIENTOS_MICROSERVICE_PORT,
  reportesMicroserviceHost: envVars.MOVIMIENTOS_MICROSERVICE_HOST,
  reportesMicroservicePort: envVars.MOVIMIENTOS_MICROSERVICE_PORT,
};
