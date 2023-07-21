//! модуль: products
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Module } from "@nestjs/common";
// наша схема
import { Product, ProductSchema } from './schemas/product.schema';

// второстепенный модуль для /products
@Module({
    // запросы (get, post, put...)
    providers: [ProductsService], //  @Injectable() определяет ProductsService, как провайдер 
    // логика (наши методы) для запросов
    controllers: [ProductsController],
    // подключили абстракную таблицу products (схему)
    imports: [
        // for Feature - для особенности (фича). Это троица (forRoot, register, и forFeature), нет строгих правил, что использовать: https://docs.nestjs.com/fundamentals/dynamic-modules#community-guidelines 
        MongooseModule.forFeature([
            // зарегистрировали нашу коллекцию (класс Product.name (name так должно быть)  и схему ProductSchema)
            {name: Product.name, schema: ProductSchema} 
        ])
    ]
})

export class ProductsModule {

}

