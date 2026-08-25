import { IsOptional, IsString } from 'class-validator';

export class GetListasHistoricosMalotesDto {
  @IsOptional()
  @IsString()
  idEmpresa?: string;

  @IsOptional()
  @IsString()
  idMalote?: string;

  @IsOptional()
  @IsString()
  idHistoricoMalote?: string;

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