import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';

// @Module - это декоратор, специальная функция, которая принимает другую функцию и изменяет её поведение^ https://learn.javascript.ru/call-apply-decorators
// конфигуратор
@Module({
  imports: [],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
