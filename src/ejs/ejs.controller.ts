import { Controller, Get, Render } from '@nestjs/common';

@Controller('/front')
export class EjsController {
  @Get('/ejs')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
