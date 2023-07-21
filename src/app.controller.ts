import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // декоратор класса
export class AppController {
  //  (приватный только для чтения: тип AppService)
  constructor(private readonly appService: AppService) {}

  @Get() // декоратор метода - Get запрос
  getHello(): string { // метод возращает string
    // return this.appService.getHello(); //! метод из app.service.ts
    // упростили код (для обучения)
    return 'Hello, NestJS!'
  }
}
