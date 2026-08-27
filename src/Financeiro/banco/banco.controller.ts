import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { BancoService } from './banco.service';
import { GetListaBancoDto } from './dto/banco.dto';
import { GetListaContaBancoDto } from './dto/conta-banco.dto';
import { UpdateContaBancoDto } from './dto/update-conta-banco.dto';
import { CreateContaBancoDto } from './dto/create-conta-banco.dto';

@Controller('financeiro/banco')
export class BancoController {
  constructor(private readonly bancoService: BancoService) { }

  @Get()
  getListaBanco(@Query() query: GetListaBancoDto) {
    return this.bancoService.getListaBanco(query);
  }

  @Get('conta')
  getListaContaBanco(@Query() query: GetListaContaBancoDto) {
    return this.bancoService.getListaContaBanco(query);
  }

  @Put('conta/:id')
  putContaBanco(@Body() body: UpdateContaBancoDto) {
    return this.bancoService.putContaBanco(body);
  }

  @Post('create-conta')
  postContaBanco(@Body() body: CreateContaBancoDto) {
    return this.bancoService.postContaBanco(body);
  }
}
