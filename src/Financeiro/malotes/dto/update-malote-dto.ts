import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class PendenciaMaloteDto {
  @IsNotEmpty()
  @IsInt()
  IDPENDENCIA: number;
}

export class UpdateMaloteDto {
  @IsNotEmpty()
  @IsInt()
  IDMALOTE: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  STATUS?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  OBSERVACAOADMINISTRATIVO?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PendenciaMaloteDto)
  PENDENCIAS?: PendenciaMaloteDto[] = [];

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  IDUSERULTIMAALTERACAO: number;
}
