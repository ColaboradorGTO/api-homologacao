import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateMalotesDto } from './create-malotes-dto';

describe('CreateMalotesDto', () => {
  const validPayload = {
    IDEMPRESA: 1,
    DATAMOVIMENTOCAIXA: '2026-01-01',
  };

  it('accepts a payload with only the required fields', async () => {
    const dto = plainToInstance(CreateMalotesDto, validPayload);

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('accepts a payload with all optional numeric/string fields filled in', async () => {
    const dto = plainToInstance(CreateMalotesDto, {
      ...validPayload,
      VRDINHEIRO: 100,
      VRCARTAO: 50,
      VRPOS: 20,
      VRPIX: 30,
      VRCONVENIO: 0,
      VRVOUCHER: 0,
      VRFATURA: 0,
      VRFATURAPIX: 0,
      VRDESPESA: 10,
      VRTOTALRECEBIDO: 200,
      VRDISPONIVEL: 190,
      IDUSERCRIACAO: 7,
      OBSERVACAOLOJA: 'sem observação',
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('rejects a payload missing IDEMPRESA', async () => {
    const dto = plainToInstance(CreateMalotesDto, {
      DATAMOVIMENTOCAIXA: '2026-01-01',
    });

    const errors = await validate(dto);

    expect(errors.some((e) => e.property === 'IDEMPRESA')).toBe(true);
  });

  it('rejects a payload missing DATAMOVIMENTOCAIXA', async () => {
    const dto = plainToInstance(CreateMalotesDto, { IDEMPRESA: 1 });

    const errors = await validate(dto);

    expect(errors.some((e) => e.property === 'DATAMOVIMENTOCAIXA')).toBe(true);
  });

  it('rejects a non-numeric VRDINHEIRO', async () => {
    const dto = plainToInstance(CreateMalotesDto, {
      ...validPayload,
      VRDINHEIRO: 'abc',
    });

    const errors = await validate(dto);

    expect(errors.some((e) => e.property === 'VRDINHEIRO')).toBe(true);
  });
});
