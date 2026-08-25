import { IsOptional, IsString } from 'class-validator';

export class GetMalotesLojaDto {
  @IsOptional()
  @IsString()
  idEmpresa?: string;

  @IsOptional()
  @IsString()
  idMarca?: string;

  @IsOptional()
  @IsString()
  idMalote?: string;

  @IsOptional()
  @IsString()
  statusMalote?: string;

  @IsOptional()
  @IsString()
  pendenciaMalote?: string;

  @IsOptional()
  @IsString()
  dataPesquisaInicio?: string;

  @IsOptional()
  @IsString()
  dataPesquisaFim?: string;

  @IsOptional()
  @IsString()
  dataConferenciaInicio?: string;

  @IsOptional()
  @IsString()
  dataConferenciaFim?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  pageSize?: string;
}
