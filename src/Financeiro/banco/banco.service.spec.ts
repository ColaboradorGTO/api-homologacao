import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { BancoService } from './banco.service';

describe('BancoService', () => {
  let service: BancoService;
  let httpService: { post: jest.Mock };

  beforeEach(async () => {
    httpService = { post: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BancoService,
        { provide: HttpService, useValue: httpService },
        {
          provide: ConfigService,
          useValue: { get: () => 'http://test.local' },
        },
      ],
    }).compile();

    service = module.get<BancoService>(BancoService);
  });

  it('creates a bank account with POST and an array payload', async () => {
    const dto = {
      IDBANCO: 45,
      DSCONTABANCO: 'TESTENODECREATE2',
      NUAGENCIA: '4455',
      NUDIGITOAGENCIA: '3',
      NUCONTA: '123',
      NUDIGITOCONTA: '42',
      TPPESSOA: 'PF',
      TPCONTA: 'PF',
      NUCONTASAP: '1',
    };
    const response: AxiosResponse<{ success: boolean }> = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as AxiosResponse['config'],
    };
    httpService.post.mockReturnValue(of(response));

    const result = await service.postContaBanco(dto);

    expect(httpService.post).toHaveBeenCalledWith(
      'http://test.local/api/financeiro/conta-banco.xsjs',
      [dto],
    );
    expect(result).toEqual({ success: true });
  });
});
