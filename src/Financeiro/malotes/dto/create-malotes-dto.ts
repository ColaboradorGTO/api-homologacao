import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMalotesDto {
  @IsNotEmpty()
  @IsNumber()
  IDEMPRESA: number;

  @IsNotEmpty()
  @IsString()
  DATAMOVIMENTOCAIXA: string;

  @IsOptional()
  @IsNumber()
  VRDINHEIRO?: number;

  @IsOptional()
  @IsNumber()
  VRCARTAO?: number;

  @IsOptional()
  @IsNumber()
  VRPOS?: number;

  @IsOptional()
  @IsNumber()
  VRPIX?: number;

  @IsOptional()
  @IsNumber()
  VRCONVENIO?: number;

  @IsOptional()
  @IsNumber()
  VRVOUCHER?: number;

  @IsOptional()
  @IsNumber()
  VRFATURA?: number;

  @IsOptional()
  @IsNumber()
  VRFATURAPIX?: number;

  @IsOptional()
  @IsNumber()
  VRDESPESA?: number;

  @IsOptional()
  @IsNumber()
  VRTOTALRECEBIDO?: number;

  @IsOptional()
  @IsNumber()
  VRDISPONIVEL?: number;

  @IsOptional()
  @IsNumber()
  IDUSERCRIACAO?: number;

  @IsOptional()
  @IsString()
  OBSERVACAOLOJA?: string;
}
