import { IsOptional, IsString } from 'class-validator';

export class GetPendenciasMalotesDto {
  @IsOptional()
  @IsString()
  idEmpresa?: string;

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
  page?: string;

  @IsOptional()
  @IsString()
  pageSize?: string;
}
