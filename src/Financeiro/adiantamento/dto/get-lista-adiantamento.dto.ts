import { IsOptional, IsString } from 'class-validator';

export class GetListaAdiantamentoSalarialDto {
  @IsOptional()
  @IsString()
  idEmpresa?: string;

  @IsOptional()
  @IsString()
  dataPesquisaInicio?: string;

  @IsOptional()
  @IsString()
  dataPesquisaFim?: string;

  @IsOptional()
  @IsString()
  pageSize?: string;

  @IsOptional()
  @IsString()
  page?: string;
}
