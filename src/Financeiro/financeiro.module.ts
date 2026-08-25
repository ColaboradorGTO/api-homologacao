/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FinanceiroController } from './financeiro.controller';
import { FinanceiroService } from './financeiro.service';
import { MalotesModule } from './malotes/malotes.module';

@Module({
    imports: [
        HttpModule,
        MalotesModule
    ],
    controllers: [
        FinanceiroController
    ],
    providers: [
        FinanceiroService
    ],
})
export class FinanceiroModule { }
