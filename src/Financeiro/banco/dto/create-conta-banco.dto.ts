import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateContaBancoDto {
  @IsNotEmpty()
  @IsInt()
  IDBANCO!: number;

  @IsNotEmpty()
  @IsString()
  DSCONTABANCO!: string;

  @IsNotEmpty()
  @IsString()
  NUAGENCIA!: string;

  @IsNotEmpty()
  @IsString()
  NUDIGITOAGENCIA!: string;

  @IsNotEmpty()
  @IsString()
  NUCONTA!: string;

  @IsNotEmpty()
  @IsString()
  NUDIGITOCONTA!: string;

  @IsNotEmpty()
  @IsString()
  TPPESSOA!: string;

  @IsNotEmpty()
  @IsString()
  TPCONTA!: string; 

  @IsNotEmpty()
  @IsString()
  NUCONTASAP!: string;

}
