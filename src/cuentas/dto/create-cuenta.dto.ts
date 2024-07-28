//import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

export enum CuentaType {
  Ahorro = 'Ahorro',
  Corriente = 'Corriente',
}
export const TipoCuentaList = [CuentaType.Ahorro, CuentaType.Corriente];
export class CreateCuentaDto {
  @IsString()
  public identificacion: string;
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  //@Min(0)
  @IsPositive()
  //Se usa @type() por que lso datos vienen como Strings cuando se usa x-www-form-urlencoded
  //@Type(() => Number)
  public saldoInicial: number;
  @IsEnum(TipoCuentaList, {
    message: `tipoCuenta: ${TipoCuentaList.join(',')}`,
  })
  public tipoCuenta: CuentaType;
}
