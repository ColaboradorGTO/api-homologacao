import { AdministrativoModule } from './Administrativo/administrativo.module';
import { FinanceiroModule } from './Financeiro/financeiro.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdministrativoModule,
    FinanceiroModule
  ],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule { }
