//! запросы get, post ...
//! файл запросов (по адресу: http://localhost:3000/products) - контроллер
import { Controller, Delete, Get, Param, Post, Put, Body, Patch, Redirect, HttpCode, HttpStatus, Header, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto'; // данные для @Post 
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

// документация по декораторам - запросам в Nest  (Get, Post, Put, Delete ...): https://docs.nestjs.com/recipes/prisma#post

// http://localhost:3000/products
// TS декоратор
@Controller('products') // Путь маршрута для обработчика определяется объединением (необязательного) префикса  и пути указанного в декораторе метода ("@Get")
export class ProductsController {

    //!  вводим в параметры наш файл логики (поля и методы)
    constructor(private readonly productService: ProductsService) { //! импортировали логику
        // пока просто получили доступ к ProductsService - использовать будем в запросах
    }

    //декоратор
    //* Get - запрос на все элементы по этому маршруту (.../products)
    @Get() // Get - запрос (получить) - предварительно импортируя @Get
    //! редирект
    //@Redirect('https://www.google.com/', 301) // редирект на гугл
    //! доступ к Request и Response -> @Req и @Res - но это нам не нужно в Nest
    //getAll(@Req() req: Request, @Res() res: Response) { // по адресу "http://localhost:3000/products" вернется return ...
    getAll(): Promise<Product[]>  { 
        //res.status(201).end('End') // после .end ответ завершается
        // return 'getAll' // полагаю можно вернуть  React-компонент
        //! воспользуемся логикой из ProductsService
        return this.productService.getAll() 
    }

    
    //* Get - запрос на один элемент
    @Get(':id')// нужно добавить параметр ':id' и декоратор @Param (также импортируется)
     // 1-й способ получения id
    // getOne(@Param() params) { // вернет params (произвольное имя) 
        
    // 2-й способ, который рекомендует сам Nest
        //f(@Params a: string) - @Params - это декоратор параметров в TypeScript
        getOne(@Param('id') id: string): Promise<Product>  { // чтобы не принимать целый объект (params), можно конкретно указать @Param нужное поле (id)
        //return 'GetOne id: ' + id // по адресу "http://localhost:3000/products/1" выведет return ...  
        //! воспользуемся логикой из ProductsService
        return this.productService.getById(id)    

    }


    //* Post - запрос (создать что-то)
    // переходим в Postman: localhost:3000/products и вводим JSON данные (для теста) 
    @Post()
    //! статус код
    @HttpCode(HttpStatus.CREATED) // можно так, но не советуется: @HttpCode(201) 
    //! Заголовки  
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateProductDto): Promise<Product> { // CreateProductDto - это из dto/create-product.dto
        // естественно  данные можем записывать в БД (например SQL запрос)
        //return `Post возвращает  введенные данные: - Title: ${createProductDto.title} Price: ${createProductDto.price}`
        //! параметр createProductDto держит в себе данные (массивы) с @Body
        return this.productService.create(createProductDto) // взять все поля из шаблона createProductDto и добавить в массив
    }


    //* Delete - запрос (удалить что-то)
    //! обязательно двоеточие ':id'
    @Delete(':id') 
    remove(@Param('id') id: string): Promise<Product> {
        // версия без БД (просто массив в service)
        // return `Remove: ${id}` // удалить по id 
        // версия с БД
        return this.productService.remove(id);

    }

    //* PUT - запрос (полностью обновить что-то), а Putch (частичное обновление)
    // хоть updateProductDto == CreateProductDto - все равно нужно создавать отдельный класс
    @Put(':id') // какой элемент по id следует изменить
    async update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> { 
        // return `Update: ${id}`
        return this.productService.update(id, updateProductDto);
    }

    //* Patch - запрос (частичное обновление)
    @Patch(':id') // какой элемент по id следует изменить
    async patch(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> { 
        // return `Patch: ${id}` // версия без БД
        return this.productService.update(id, updateProductDto);
    }

    
}
