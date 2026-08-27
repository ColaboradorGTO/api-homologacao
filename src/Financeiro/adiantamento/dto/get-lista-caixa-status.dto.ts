import { IsOptional, IsString } from 'class-validator';

export class GetListaCaixaStatusDto {
  @IsOptional()
  @IsString()
  idEmpresa?: string;

  @IsOptional()
  @IsString()
  idMarca?: string;

  @IsOptional()
  @IsString()
  dataPesquisaInicio?: string;

  @IsOptional()
  @IsString()
  dataPesquisaFim?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  pageSize?: string;
}
