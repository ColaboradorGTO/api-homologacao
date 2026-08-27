import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class UpdateContaBancoDto {
  @IsNotEmpty()
  @IsInt()
  IDCONTABANCO!: number;

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
  STPADRAO!: string;

  @IsNotEmpty()
  @IsString()
  STATIVO!: string;

  @IsNotEmpty()
  @IsString()
  NUCONTASAP!: string;

  @IsNotEmpty()
  @IsString()
  TPCONTA!: string;
}
