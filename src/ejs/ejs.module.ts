import { Module } from '@nestjs/common';
import { EjsController } from './ejs.controller';

@Module({
  controllers: [EjsController],
})
export class EjsModule {}
