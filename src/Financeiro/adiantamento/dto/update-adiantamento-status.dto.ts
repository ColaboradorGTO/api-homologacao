import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class UpdateAdiantamentoStatusDto {
  @IsNotEmpty()
  @IsInt()
  IDADIANTAMENTOSALARIO?: string;

  @IsNotEmpty()
  @IsString()
  STATIVO!: string;
}
