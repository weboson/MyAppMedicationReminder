// для метода update()
import { UpdateProductDto } from './dto/update-product.dto';
// вспомогательная логика - методы служащие контроллеру (products.controller)
import { CreateProductDto } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common'; // для подключения схемы

import { Product, ProductDocument } from './schemas/product.schema'; // логика для запросов
import { InjectModel } from '@nestjs/mongoose';  // для подключения в constructor модели коллекции(?)
import { Model } from 'mongoose'; // для типа параметра в constructor

//import { MongooseModule } from '@nestjs/mongoose';

//! @Injectable() определяет ProductsService, как провайдер: https://docs.nestjs.com/fundamentals/custom-providers#di-fundamentals 
@Injectable() // перевод: Инъекционный
export class ProductsService {

    // внедрить модель (таблицу из двух свойств: title и price) из схемы 
    // Product.name (name так должно быть), декодер @Schema() позволяет это. Схема импортируется также в products.modules.ts
    //                                             тип Model из mongoose и благодаря типу, получаем спец методы: 
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {} 

    // массив псевдо базы данных
    // private products = [] // теперь массив добавляется, читается в БД

    // метод получить все данные (весь массив объектов)
    async getAll(): Promise<Product[]> { // возращает промис, в котором массив типом Product
        //console.log(MongooseModule.forRoot('mongodb+srv://weboson:Mong0DBreadonly$@cluster0.u9yqonn.mongodb.net/?retryWrites=true&w=majority'))
        // return this.products
        return this.productModel.find().exec(); //exec - чтобы размернуть данные
    }

    async getById(id: string): Promise<Product> {
        //return this.products.find(p => p.id == id) // из массива найти схожесть с id (из котроллера: products.controller.ts)
        return this.productModel.findById(id)
    }

    async create(productDto: CreateProductDto): Promise<Product>  { // брать из шаблона сущности CreateProductDto
        // // добавим в массив поля products все поля из CreateProductDto и добавим еще id: генерация
        // this.products.push({ // этот массив типа БД, сохраняет POST -запросы
        //     ...productDto, // если уже были записи (post) массивов, которые хранятся в @Body (файл product.controller.ts) 
        //     id: Date.now().toString() // генерируем рандомный id 
        // })

        // return this.products // чтобы увидеть в PostMan (Body)
        const newProduct = new this.productModel(productDto)
        return newProduct.save(); // метод сохраняет данные
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndRemove(id)
    }

    async update(id: string, productDto: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productDto, {new: true}); // 3-й параметр(new: true) - если модель (по id) не найдет создает новый
    }
}
