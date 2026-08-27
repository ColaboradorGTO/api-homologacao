/*
https://docs.nestjs.com/modules
*/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MalotesController } from './malotes.controller';
import { MalotesService } from './malotes.service';

@Module({
  imports: [HttpModule],
  controllers: [MalotesController],
  providers: [MalotesService],
})
export class MalotesModule {}
