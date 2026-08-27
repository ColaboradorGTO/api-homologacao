/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateMalotesDto } from './dto/create-malotes-dto';
import { GetListasHistoricosMalotesDto } from './dto/get-listas-historicos-malotes-dto';
import { GetMalotesLojaDto } from './dto/get-malotes-loja-dto';
import { GetPendenciasMalotesDto } from './dto/get-pendencias-malotes-dto';
import { UpdateMaloteDto } from './dto/update-malote-dto';
import { MalotesService } from './malotes.service';

@Controller('financeiro/malotes')
export class MalotesController {
  constructor(private readonly malotesService: MalotesService) {}

  @Get('historicos')
  getListasHistoricosMalotes(@Query() query: GetListasHistoricosMalotesDto) {
    return this.malotesService.getListasHistoricosMalotes(query);
  }

  @Get('pendencias')
  getListaPendenciasMalotes(@Query() query: GetPendenciasMalotesDto) {
    return this.malotesService.getListaPendenciasMalotes(query);
  }

  @Get()
  getListasMalotesLojas(@Query() query: GetMalotesLojaDto) {
    return this.malotesService.getListasMalotesLojas(query);
  }

  @Post()
  createMalotePorLoja(@Body() body: CreateMalotesDto) {
    return this.malotesService.createMalotePorLoja(body);
  }

  @Put(':id')
  updateMalote(@Param('id') id: string, @Body() body: UpdateMaloteDto) {
    return this.malotesService.updateMalote(body);
  }
}
