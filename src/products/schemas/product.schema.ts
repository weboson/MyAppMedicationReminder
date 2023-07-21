//! это схема, типа абстрактная таблица (класс) с полями title и price
// импортируем  данный модуль (файл) в products.module.ts 
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>; //! инжектировали (@InjectModel) в products.service.ts

// @Schema() - декоратор для создании схемы
@Schema()
export class Product { //! инжектировали (@InjectModel) в products.service.ts, где все http - запросы (get, post, put...)
// для создания поля - используется декоратор @Prop(). Property - свойство 
  @Prop()
  title: string;

  @Prop()
  price: number;
}
//! сама схема: ProductSchema
export const ProductSchema = SchemaFactory.createForClass(Product); // SchemaFactory - фабрика(обёртка) для создания самой схемы