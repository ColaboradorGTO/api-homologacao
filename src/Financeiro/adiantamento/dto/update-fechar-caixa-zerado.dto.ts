import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFecharCaixaZeradoDto {
  @IsNotEmpty()
  @IsString()
  ID: string;
}
