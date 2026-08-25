import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { CreateMalotesDto } from './dto/create-malotes-dto';
import { GetListasHistoricosMalotesDto } from './dto/get-listas-historicos-malotes-dto';
import { GetMalotesLojaDto } from './dto/get-malotes-loja-dto';
import { GetPendenciasMalotesDto } from './dto/get-pendencias-malotes-dto';
import { UpdateMaloteDto } from './dto/update-malote-dto';

@Injectable()
export class MalotesService {
    private readonly logger = new Logger(MalotesService.name);

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
    

    async getListasHistoricosMalotes(
        query: GetListasHistoricosMalotesDto,
    ) {
        const {
            idEmpresa = '',
            idMalote = '',
            idHistoricoMalote = '',
            dataPesquisaInicio = '',
            dataPesquisaFim = '',
            dataConferenciaInicio = '',
            dataConferenciaFim = '',
            page = '',
            pageSize = '',
        } = query;

        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.baseUrl}/api/financeiro/historicos-malotes.xsjs`,
                    {
                        params: {
                            idEmpresa,
                            idMalote,
                            idHistoricoMalote,
                            dataPesquisaInicio,
                            dataPesquisaFim,
                            dataConferenciaInicio,
                            dataConferenciaFim,
                            page,
                            pageSize,
                        },
                    },
                ),
            );

            return response.data;
        } catch (error) {
            this.logger.error(
                'Erro no MalotesService.getListasHistoricosMalotes',
                error,
            );

            throw error;
        }
    }

    async getListasMalotesLojas(
        query: GetMalotesLojaDto,
    ) {
        const {
            idEmpresa = '',
            idMarca = '',
            idMalote = '',
            statusMalote = '',
            pendenciaMalote = '',
            dataPesquisaInicio = '',
            dataPesquisaFim = '',
            dataConferenciaInicio = '',
            dataConferenciaFim = '',
            page = '',
            pageSize = '',
        } = query;

        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.baseUrl}/api/financeiro/malotes-por-loja.xsjs`,
                    {
                        params: {
                            idGrupoEmpresarial: idMarca,
                            idEmpresa,
                            statusMalote,
                            idMalote,
                            idPendenciaMalote: pendenciaMalote,
                            dataPesquisaInicio,
                            dataPesquisaFim,
                            dataConferenciaInicio,
                            dataConferenciaFim,
                            page,
                            pageSize,
                        },
                    },
                ),
            );

            return response.data;
        } catch (error) {
            this.logger.error(
                'Erro no MalotesService.getListasMalotesLojas',
                error,
            );

            throw error;
        }
    }

    async getListaPendenciasMalotes(
        query: GetPendenciasMalotesDto,
    ) {
        const {
            idEmpresa = '',
            idMalote = '',
            statusMalote = '',
            pendenciaMalote = '',
            page = '',
            pageSize = '',
        } = query;

        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.baseUrl}/api/financeiro/pendencias-malotes.xsjs`,
                    {
                        params: {
                            idEmpresa,
                            idMalote,
                            statusMalote,
                            pendenciaMalote,
                            page,
                            pageSize,
                        },
                    },
                ),
            );

            return response.data;
        } catch (error) {
            this.logger.error(
                'Erro no MalotesService.getListaPendenciasMalotes',
                error,
            );

            throw error;
        }
    }

    async createMalotePorLoja(
        dto: CreateMalotesDto,
    ) {
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    `${this.baseUrl}/api/financeiro/malotes-por-loja.xsjs`,
                    [dto],
                ),
            );

            return response.data;
        } catch (error) {
            this.logger.error(
                'Erro no MalotesService.createMalotePorLoja',
                error,
            );

            throw error;
        }
    }

    async updateMalote(
        dto: UpdateMaloteDto,
    ) {
        try {
            const response = await firstValueFrom(
                this.httpService.put(
                    `${this.baseUrl}/api/financeiro/malotes-por-loja.xsjs`,
                    [dto],
                ),
            );

            return response.data;
        } catch (error) {
            this.logger.error(
                'Erro no MalotesService.updateMalote',
                error,
            );

            throw error;
        }
    }
}