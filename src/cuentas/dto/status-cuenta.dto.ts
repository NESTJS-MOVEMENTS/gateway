import { IsBoolean } from 'class-validator';

export class EstadoCuentaDto {
  //status de la cuenta
  @IsBoolean()
  public estado: boolean;
}
