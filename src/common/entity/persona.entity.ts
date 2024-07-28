//import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

export enum GenderType {
  female = 'female',
  male = 'male',
}

export const GenderList = [GenderType.female, GenderType.male];
export class persona {
  @IsString()
  public nombre: string;
  //@IsString()
  //@Length(1, 1)
  //@IsEnum(GenderType)
  @IsEnum(GenderList, {
    message: `Los posibles valores son: ${GenderList.join(',')}`,
  })
  public genero: GenderType;
  @IsNumber()
  @Min(1)
  //@IsPositive()
  //Solo usamos @Type() si los datos vienen por x-www-urlencoded
  //@Type(() => Number)
  public edad: number;
  @IsString()
  public identificacion: string;
  @IsString()
  public direccion: string;
  @IsString()
  public telefono: string;
}
