/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { AdiantamentoService } from './adiantamento.service';
import { GetListaAdiantamentoSalarialDto } from './dto/get-lista-adiantamento.dto';
import { GetListaCaixaStatusDto } from './dto/get-lista-caixa-status.dto';
import { GetListaCaixasMovimentoDto } from './dto/get-lista-caixas-movimento.dto';
import { UpdateFecharCaixaZeradoDto } from './dto/update-fechar-caixa-zerado.dto';
import { UpdateAdiantamentoStatusDto } from './dto/update-adiantamento-status.dto';

@Controller('financeiro/adiantamento')
export class AdiantamentoController {
  constructor(private readonly adiantamentoService: AdiantamentoService) {}

  @Get('salarial')
  getListaAdiantamentoSalarial(
    @Query() query: GetListaAdiantamentoSalarialDto,
  ) {
    return this.adiantamentoService.getListaAdiantamentoSalarial(query);
  }

  @Get('caixas-movimento')
  getListaCaixasMovimento(@Query() query: GetListaCaixasMovimentoDto) {
    return this.adiantamentoService.getListaCaixasMovimento(query);
  }

  @Get('caixas-status')
  getListaCaixaStatus(@Query() query: GetListaCaixaStatusDto) {
    return this.adiantamentoService.getListaCaixaStatus(query);
  }

  @Put('fechar-caixas-zerados/:id')
  updateFecharCaixaZerado(@Body() body: UpdateFecharCaixaZeradoDto) {
    return this.adiantamentoService.updateFecharCaixaZerado(body);
  }

  @Put('status/:id')
  updateAdiantamentoStatus(@Body() body: UpdateAdiantamentoStatusDto) {
    return this.adiantamentoService.updateAdiantamentoStatus(body);
  }
}
