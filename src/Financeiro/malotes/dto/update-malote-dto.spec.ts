import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateMaloteDto } from './update-malote-dto';

describe('UpdateMaloteDto', () => {
  const validPayload = {
    IDMALOTE: 1,
    IDUSERULTIMAALTERACAO: 10,
  };

  it('accepts a payload with only the required fields', async () => {
    const dto = plainToInstance(UpdateMaloteDto, validPayload);

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('accepts a payload with a valid PENDENCIAS array', async () => {
    const dto = plainToInstance(UpdateMaloteDto, {
      ...validPayload,
      STATUS: 'CONFERIDO',
      OBSERVACAOADMINISTRATIVO: 'ok',
      PENDENCIAS: [{ IDPENDENCIA: 1 }, { IDPENDENCIA: 2 }],
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('rejects a payload missing IDMALOTE', async () => {
    const dto = plainToInstance(UpdateMaloteDto, {
      IDUSERULTIMAALTERACAO: 10,
    });

    const errors = await validate(dto);

    expect(errors.some((e) => e.property === 'IDMALOTE')).toBe(true);
  });

  it('rejects a payload missing IDUSERULTIMAALTERACAO', async () => {
    const dto = plainToInstance(UpdateMaloteDto, { IDMALOTE: 1 });

    const errors = await validate(dto);

    expect(
      errors.some((e) => e.property === 'IDUSERULTIMAALTERACAO'),
    ).toBe(true);
  });

  it('rejects a non-positive IDUSERULTIMAALTERACAO', async () => {
    const dto = plainToInstance(UpdateMaloteDto, {
      ...validPayload,
      IDUSERULTIMAALTERACAO: -1,
    });

    const errors = await validate(dto);

    expect(
      errors.some((e) => e.property === 'IDUSERULTIMAALTERACAO'),
    ).toBe(true);
  });

  it('rejects a PENDENCIAS entry missing IDPENDENCIA', async () => {
    const dto = plainToInstance(UpdateMaloteDto, {
      ...validPayload,
      PENDENCIAS: [{}],
    });

    const errors = await validate(dto);

    const pendenciasError = errors.find((e) => e.property === 'PENDENCIAS');
    expect(pendenciasError).toBeDefined();
    expect(pendenciasError?.children?.[0]?.children?.[0]?.property).toBe(
      'IDPENDENCIA',
    );
  });

  it('rejects a STATUS longer than 500 characters', async () => {
    const dto = plainToInstance(UpdateMaloteDto, {
      ...validPayload,
      STATUS: 'a'.repeat(501),
    });

    const errors = await validate(dto);

    expect(errors.some((e) => e.property === 'STATUS')).toBe(true);
  });
});
