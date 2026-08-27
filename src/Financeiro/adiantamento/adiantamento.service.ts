import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GetListaAdiantamentoSalarialDto } from './dto/get-lista-adiantamento.dto';
import { GetListaCaixasMovimentoDto } from './dto/get-lista-caixas-movimento.dto';
import { GetListaCaixaStatusDto } from './dto/get-lista-caixa-status.dto';
import { GetListaCaixasZeradosDto } from './dto/get-lista-caixas-zerados.dto';
import { UpdateFecharCaixaZeradoDto } from './dto/update-fechar-caixa-zerado.dto';
import { UpdateAdiantamentoStatusDto } from './dto/update-adiantamento-status.dto';

@Injectable()
export class AdiantamentoService {
  private readonly logger = new Logger(AdiantamentoService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private get baseUrl(): string {
    const url = this.configService.get<string>('API_URL');

    if (!url) {
      throw new Error('API_URL não foi configurada.');
    }

    return url;
  }

  async getListaAdiantamentoSalarial(
    query: GetListaAdiantamentoSalarialDto,
  ): Promise<unknown> {
    const {
      idEmpresa = '',
      dataPesquisaInicio = '',
      dataPesquisaFim = '',
      pageSize = '',
      page = '',
    } = query;

    try {
      const response = await firstValueFrom(
        this.httpService.get<unknown>(
          `${this.baseUrl}/api/financeiro/adiantamento-salarial.xsjs`,
          {
            params: {
              idEmpresa,
              dataPesquisaInicio,
              dataPesquisaFim,
              pageSize,
              page,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        'Erro no AdiantamentoService.getListaAdiantamentoSalarial',
        error,
      );

      throw error;
    }
  }

  async getListaCaixasMovimento(
    query: GetListaCaixasMovimentoDto,
  ): Promise<unknown> {
    const {
      idMarca = '',
      dataPesquisaInicio = '',
      dataPesquisaFim = '',
      idLoja = '',
      idLojaPesquisa = '',
      page = '',
      pageSize = '',
    } = query;

    try {
      const response = await firstValueFrom(
        this.httpService.get<unknown>(
          `${this.baseUrl}/api/financeiro/lista-caixas-movimento.xsjs`,
          {
            params: {
              idMarca,
              dataPesquisaInicio,
              dataPesquisaFim,
              idLoja,
              idLojaPesq: idLojaPesquisa,
              page,
              pageSize,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        'Erro no AdiantamentoService.getListaCaixasMovimento',
        error,
      );

      throw error;
    }
  }

  async getListaCaixaStatus(query: GetListaCaixaStatusDto): Promise<unknown> {
    const {
      idEmpresa = '',
      idMarca = '',
      dataPesquisaInicio = '',
      dataPesquisaFim = '',
      page = '',
      pageSize = '',
    } = query;

    try {
      const response = await firstValueFrom(
        this.httpService.get<unknown>(
          `${this.baseUrl}/api/financeiro/lista-caixas-status.xsjs`,
          {
            params: {
              idEmpresa,
              idMarca,
              dataInicial: dataPesquisaInicio,
              dataFinal: dataPesquisaFim,
              page,
              pageSize,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        'Erro no AdiantamentoService.getListaCaixaStatus',
        error,
      );

      throw error;
    }
  }

  async getListaCaixaZerados(
    query: GetListaCaixasZeradosDto,
  ): Promise<unknown> {
    const {
      idEmpresa = '',
      idMarca = '',
      dataPesquisaInicio = '',
      dataPesquisaFim = '',
      page = '',
      pageSize = '',
    } = query;

    try {
      const response = await firstValueFrom(
        this.httpService.get<unknown>(
          `${this.baseUrl}/api/financeiro/lista-caixas-zerados.xsjs`,
          {
            params: {
              idEmpresa,
              idMarca,
              dataInicial: dataPesquisaInicio,
              dataFinal: dataPesquisaFim,
              page,
              pageSize,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        'Erro no AdiantamentoService.getListaCaixaZerados',
        error,
      );

      throw error;
    }
  }

  async updateFecharCaixaZerado(
    dto: UpdateFecharCaixaZeradoDto,
  ): Promise<unknown> {
    try {
      const response = await firstValueFrom(
        this.httpService.put<unknown>(
          `${this.baseUrl}/api/financeiro/fecha-caixas-zerados.xsjs`,
          dto,
        ),
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        'Erro no AdiantamentoService.updateFecharCaixaZerado',
        error,
      );

      throw error;
    }
  }

  async updateAdiantamentoStatus(
    dto: UpdateAdiantamentoStatusDto,
  ): Promise<unknown> {
    try {
      const response = await firstValueFrom(
        this.httpService.put<unknown>(
          `${this.baseUrl}/api/financeiro/atualizacao-adiantamento-status.xsjs`,
          dto,
        ),
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        'Erro no AdiantamentoService.updateAdiantamentoStatus',
        error,
      );

      throw error;
    }
  }
}
