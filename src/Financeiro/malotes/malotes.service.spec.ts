import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { MalotesService } from './malotes.service';

describe('MalotesService', () => {
  let service: MalotesService;
  let httpService: { get: jest.Mock; post: jest.Mock; put: jest.Mock };
  let loggerErrorSpy: jest.SpyInstance;

  const axiosResponseOf = <T>(data: T): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as AxiosResponse['config'],
  });

  beforeEach(async () => {
    httpService = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
    };

    loggerErrorSpy = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(() => undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MalotesService,
        { provide: HttpService, useValue: httpService },
        {
          provide: ConfigService,
          useValue: { get: () => 'http://test.local' },
        },
      ],
    }).compile();

    service = module.get<MalotesService>(MalotesService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getListasHistoricosMalotes', () => {
    it('calls the historicos-malotes endpoint with the given query params', async () => {
      const responseData = { data: [{ IDHISTORICOMALOTE: 1 }] };
      httpService.get.mockReturnValue(of(axiosResponseOf(responseData)));

      const result = await service.getListasHistoricosMalotes({
        idEmpresa: '1',
        idMalote: '2',
        dataPesquisaInicio: '2026-01-01',
        dataPesquisaFim: '2026-01-31',
      });

      expect(result).toEqual(responseData);
      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('/api/financeiro/historicos-malotes.xsjs'),
        {
          params: {
            idEmpresa: '1',
            idMalote: '2',
            idHistoricoMalote: '',
            dataPesquisaInicio: '2026-01-01',
            dataPesquisaFim: '2026-01-31',
            dataConferenciaInicio: '',
            dataConferenciaFim: '',
            page: '',
            pageSize: '',
          },
        },
      );
    });

    it('logs and rethrows when the request fails', async () => {
      const error = new Error('network error');
      httpService.get.mockReturnValue(throwError(() => error));

      await expect(service.getListasHistoricosMalotes({})).rejects.toThrow(
        'network error',
      );
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Erro no MalotesService.getListasHistoricosMalotes',
        error,
      );
    });
  });

  describe('getListasMalotesLojas', () => {
    it('maps idMarca and pendenciaMalote to the SAP query params', async () => {
      const responseData = { data: [] };
      httpService.get.mockReturnValue(of(axiosResponseOf(responseData)));

      const result = await service.getListasMalotesLojas({
        idMarca: '9',
        pendenciaMalote: '3',
        idEmpresa: '1',
      });

      expect(result).toEqual(responseData);
      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('/api/financeiro/malotes-por-loja.xsjs'),
        {
          params: {
            idGrupoEmpresarial: '9',
            idPendenciaMalote: '3',
            idEmpresa: '1',
            statusMalote: '',
            idMalote: '',
            dataPesquisaInicio: '',
            dataPesquisaFim: '',
            dataConferenciaInicio: '',
            dataConferenciaFim: '',
            page: '',
            pageSize: '',
          },
        },
      );
    });

    it('logs and rethrows when the request fails', async () => {
      const error = new Error('boom');
      httpService.get.mockReturnValue(throwError(() => error));

      await expect(service.getListasMalotesLojas({})).rejects.toThrow('boom');
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Erro no MalotesService.getListasMalotesLojas',
        error,
      );
    });
  });

  describe('getListaPendenciasMalotes', () => {
    it('calls the pendencias-malotes endpoint with the given query params', async () => {
      const responseData = { data: [{ IDPENDENCIA: 1 }] };
      httpService.get.mockReturnValue(of(axiosResponseOf(responseData)));

      const result = await service.getListaPendenciasMalotes({
        idEmpresa: '1',
        statusMalote: 'ABERTO',
      });

      expect(result).toEqual(responseData);
      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('/api/financeiro/pendencias-malotes.xsjs'),
        {
          params: {
            idEmpresa: '1',
            idMalote: '',
            statusMalote: 'ABERTO',
            pendenciaMalote: '',
            page: '',
            pageSize: '',
          },
        },
      );
    });

    it('logs and rethrows when the request fails', async () => {
      const error = new Error('boom');
      httpService.get.mockReturnValue(throwError(() => error));

      await expect(service.getListaPendenciasMalotes({})).rejects.toThrow(
        'boom',
      );
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Erro no MalotesService.getListaPendenciasMalotes',
        error,
      );
    });
  });

  describe('createMalotePorLoja', () => {
    it('posts the payload wrapped in an array to the SAP endpoint', async () => {
      const responseData = { success: true };
      httpService.post.mockReturnValue(of(axiosResponseOf(responseData)));

      const dto = {
        IDEMPRESA: 1,
        DATAMOVIMENTOCAIXA: '2026-01-01',
      };

      const result = await service.createMalotePorLoja(dto);

      expect(result).toEqual(responseData);
      expect(httpService.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/financeiro/malotes-por-loja.xsjs'),
        [dto],
      );
    });

    it('logs and rethrows when the request fails', async () => {
      const error = new Error('boom');
      httpService.post.mockReturnValue(throwError(() => error));

      await expect(
        service.createMalotePorLoja({
          IDEMPRESA: 1,
          DATAMOVIMENTOCAIXA: '2026-01-01',
        }),
      ).rejects.toThrow('boom');
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Erro no MalotesService.createMalotePorLoja',
        error,
      );
    });
  });

  describe('updateMalote', () => {
    it('puts the payload wrapped in an array to the SAP endpoint', async () => {
      const responseData = { success: true };
      httpService.put.mockReturnValue(of(axiosResponseOf(responseData)));

      const dto = {
        IDMALOTE: 1,
        IDUSERULTIMAALTERACAO: 10,
      };

      const result = await service.updateMalote(dto);

      expect(result).toEqual(responseData);
      expect(httpService.put).toHaveBeenCalledWith(
        expect.stringContaining('/api/financeiro/malotes-por-loja.xsjs'),
        [dto],
      );
    });

    it('logs and rethrows when the request fails', async () => {
      const error = new Error('boom');
      httpService.put.mockReturnValue(throwError(() => error));

      await expect(
        service.updateMalote({
          IDMALOTE: 1,
          IDUSERULTIMAALTERACAO: 10,
        }),
      ).rejects.toThrow('boom');
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Erro no MalotesService.updateMalote',
        error,
      );
    });
  });
});
