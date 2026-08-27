import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GetListaBancoDto } from './dto/banco.dto';
import { GetListaContaBancoDto } from './dto/conta-banco.dto';
import { UpdateContaBancoDto } from './dto/update-conta-banco.dto';
import { CreateContaBancoDto } from './dto/create-conta-banco.dto';

@Injectable()
export class BancoService {
  private readonly logger = new Logger(BancoService.name);

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

  async getListaBanco(query: GetListaBancoDto): Promise<unknown> {
    const { page = '', pageSize = '' } = query;

    try {
      const response = await firstValueFrom(
        this.httpService.get<unknown>(`${this.baseUrl}/api/banco.xsjs`, {
          params: { page, pageSize },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error('Erro no BancoService.getListaBanco', error);

      throw error;
    }
  }

  async getListaContaBanco(query: GetListaContaBancoDto): Promise<unknown> {
    const {
      idContaBanco = '',
      idBanco = '',
      idEmpresa = '',
      dsConta = '',
      page = '',
      pageSize = '',
    } = query;

    try {
      const response = await firstValueFrom(
        this.httpService.get<unknown>(
          `${this.baseUrl}/api/financeiro/conta-banco.xsjs`,
          {
            params: {
              id: idContaBanco,
              idBanco,
              idEmpresa,
              dsConta,
              page,
              pageSize,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Erro no BancoService.getListaContaBanco', error);

      throw error;
    }
  }

  async putContaBanco(
    dto: UpdateContaBancoDto,
  ): Promise<unknown> {
    try {
      const response = await firstValueFrom(
        this.httpService.put<unknown>(
          `${this.baseUrl}/api/financeiro/conta-banco.xsjs`,
          [dto],
        ),
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        'Erro no BancoService.putContaBanco',
        error,
      );

      throw error;
    }
  }

  async postContaBanco(
    dto: CreateContaBancoDto,
  ): Promise<unknown> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<unknown>(
          `${this.baseUrl}/api/financeiro/conta-banco.xsjs`,
          [dto],
        ),
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        'Erro no BancoService.postContaBanco',
        error,
      );

      throw error;
    }
  }
}
