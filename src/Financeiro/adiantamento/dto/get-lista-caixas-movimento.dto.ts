import { IsOptional, IsString } from 'class-validator';

export class GetListaCaixasMovimentoDto {
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
  idLoja?: string;

  @IsOptional()
  @IsString()
  idLojaPesquisa?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  pageSize?: string;
}
