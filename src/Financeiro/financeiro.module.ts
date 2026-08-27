import { BancoController } from './banco/banco.controller';
import { BancoService } from './banco/banco.service';
import { AdiantamentoService } from './adiantamento/adiantamento.service';
import { AdiantamentoController } from './adiantamento/adiantamento.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FinanceiroController } from './financeiro.controller';
import { FinanceiroService } from './financeiro.service';
import { MalotesModule } from './malotes/malotes.module';

@Module({
  imports: [HttpModule, MalotesModule],
  controllers: [BancoController, AdiantamentoController, FinanceiroController],
  providers: [AdiantamentoService, BancoService, FinanceiroService],
})
export class FinanceiroModule {}
