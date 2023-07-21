//! главный модуль 
import { Module } from '@nestjs/common';
//! Для работы с MongoDB 
import { MongooseModule } from '@nestjs/mongoose';

//! наш модуль
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// наш контроллер (get,post...) на url localhost:3000/products
import { ProductsController } from './products/products.controller';
// наш сервис файл (логика)
import { ProductsService } from './products/products.service';


// @Module - это декоратор, специальная функция, которая принимает другую функцию и изменяет её поведение^ https://learn.javascript.ru/call-apply-decorators
// конфигуратор
// Декораторы в TypeScript: https://www.youtube.com/watch?v=1-lWrocbnK8 
// декоратор НАД КЛАССОМ с 3-ми аргументами
@Module({
  imports: [
    ProductsModule, 
    // URI взяли из аккаунта MongoDB - кстати, чтобы не писать длинную строчку, можно дилегировать, то есть создать константу в отдельнеом файле
    //! При такой настройке вы должны сообщить MongooseModule.forFeature() функции, какое соединение следует использовать. Источник: https://docs.nestjs.com/techniques/mongodb
    //! пароль от пользователя БД (текущий пароль: weboson)
    MongooseModule.forRoot(`mongodb+srv://weboson:weboson@cluster0.u9yqonn.mongodb.net/?retryWrites=true&w=majority`)
  ], // наш модуль
  controllers: [AppController ], // ProductsController удалил так как создал отдельный модуль ProductsModule
  providers: [AppService ], // зарегистрировали наш сервис-модуль "ProductsService"  --- ProductsService также удалил так как создал отдельный модуль ProductsModule
})
export class AppModule {} // пустой класс, который завернут в декоратор @Module
