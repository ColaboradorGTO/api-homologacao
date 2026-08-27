import { IsOptional, IsString } from 'class-validator';

export class GetListaContaBancoDto {
  @IsOptional()
  @IsString()
  idContaBanco?: string;

  @IsOptional()
  @IsString()
  idBanco?: string;

  @IsOptional()
  @IsString()
  idEmpresa?: string;

  @IsOptional()
  @IsString()
  dsConta?: string;

  @IsOptional()
  @IsString()
  pageSize?: string;

  @IsOptional()
  @IsString()
  page?: string;
}
