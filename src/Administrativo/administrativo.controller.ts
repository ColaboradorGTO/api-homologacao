/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AdministrativoController {
  constructor() {}

  @Get()
  getListasHistoricosMalotes() {}
}
