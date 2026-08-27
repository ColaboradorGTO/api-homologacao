import { IsOptional, IsString } from 'class-validator';

export class GetListaBancoDto {
  @IsOptional()
  @IsString()
  pageSize?: string;

  @IsOptional()
  @IsString()
  page?: string;
}
