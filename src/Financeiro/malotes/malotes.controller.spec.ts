import { Test, TestingModule } from '@nestjs/testing';
import { MalotesController } from './malotes.controller';
import { MalotesService } from './malotes.service';

describe('MalotesController', () => {
  let controller: MalotesController;
  let service: {
    getListasHistoricosMalotes: jest.Mock;
    getListaPendenciasMalotes: jest.Mock;
    getListasMalotesLojas: jest.Mock;
    createMalotePorLoja: jest.Mock;
    updateMalote: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      getListasHistoricosMalotes: jest.fn(),
      getListaPendenciasMalotes: jest.fn(),
      getListasMalotesLojas: jest.fn(),
      createMalotePorLoja: jest.fn(),
      updateMalote: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MalotesController],
      providers: [{ provide: MalotesService, useValue: service }],
    }).compile();

    controller = module.get<MalotesController>(MalotesController);
  });

  it('delegates getListasHistoricosMalotes to the service with the query', async () => {
    const query = { idEmpresa: '1' };
    service.getListasHistoricosMalotes.mockResolvedValue({ data: [] });

    const result = await controller.getListasHistoricosMalotes(query);

    expect(service.getListasHistoricosMalotes).toHaveBeenCalledWith(query);
    expect(result).toEqual({ data: [] });
  });

  it('delegates getListaPendenciasMalotes to the service with the query', async () => {
    const query = { idMalote: '5' };
    service.getListaPendenciasMalotes.mockResolvedValue({ data: [] });

    const result = await controller.getListaPendenciasMalotes(query);

    expect(service.getListaPendenciasMalotes).toHaveBeenCalledWith(query);
    expect(result).toEqual({ data: [] });
  });

  it('delegates getListasMalotesLojas to the service with the query', async () => {
    const query = { idEmpresa: '1', idMarca: '2' };
    service.getListasMalotesLojas.mockResolvedValue({ data: [] });

    const result = await controller.getListasMalotesLojas(query);

    expect(service.getListasMalotesLojas).toHaveBeenCalledWith(query);
    expect(result).toEqual({ data: [] });
  });

  it('delegates createMalotePorLoja to the service with the body', async () => {
    const body = { IDEMPRESA: 1, DATAMOVIMENTOCAIXA: '2026-01-01' };
    service.createMalotePorLoja.mockResolvedValue({ success: true });

    const result = await controller.createMalotePorLoja(body);

    expect(service.createMalotePorLoja).toHaveBeenCalledWith(body);
    expect(result).toEqual({ success: true });
  });

  it('delegates updateMalote to the service with the body, ignoring the route param', async () => {
    const body = { IDMALOTE: 1, IDUSERULTIMAALTERACAO: 10 };
    service.updateMalote.mockResolvedValue({ success: true });

    const result = await controller.updateMalote('1', body);

    expect(service.updateMalote).toHaveBeenCalledWith(body);
    expect(result).toEqual({ success: true });
  });
});
