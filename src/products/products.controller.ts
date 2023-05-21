import { Controller, Delete, Get, Param, Post, Put, Body, Patch } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto'; // данные для @Post 
import { UpdateProductDto } from './dto/update-product.dto';

// документация по декораторам - запросам в Nest  (Get, Post, Put, Delete ...): https://docs.nestjs.com/recipes/prisma#post

@Controller('products') // Путь маршрута для обработчика определяется объединением (необязательного) префикса  и пути указанного в декораторе метода ("@Get")
export class ProductsController {
    //декораторе метода запроса
    //* Get - запрос на все элементы по этому маршруту (.../products)
    @Get() // Get - запрос (получить) - предварительно импортируя @Get
    getAll(): string { // по адресу "http://localhost:3000/products" вернется return ...
        return 'getAll' // полагаю можно вернуть  React-компонент
    }

   
    //* Get - запрос на один элемент
    @Get(':id') // нужно добавить параметр ':id' и декоратор @Param (также импортируется)
     // 1-q способ получения id
    // getOne(@Param() params) { // вернет params (произвольное имя) 
        
    // 2-й способ, который рекомендует сам Nest
        getOne(@Param('id') id: string): string { // чтобы не принимать целый объект (params), можно конкретно указать @Param нужное поле (id)
        return 'GetOne id: ' + id // по адресу "http://localhost:3000/products/1" выведет return ...  

    }


    //* Post - запрос (создать что-то)
    // переходим в Postman: localhost:3000/products и вводим JSON данные (для теста) 
    @Post()
    create(@Body() createProductDto: CreateProductDto): string { // CreateProductDto - это из dto/create-product.dto
        // естественно  данные можем записывать в БД (например SQL запрос)
        return `Post возращает введенные данные: - Title: ${createProductDto.title} Price: ${createProductDto.price}`
    }


    //* Delete - запрос (удалить что-то)
    //! обязательно двоеточие ':id'
    @Delete(':id') 
    remove(@Param('id') id: string) {
        // также можем удлаить из БД по id
        return `Remove: ${id}` // удалить по id 
    }

    //* PUT - запрос (полностью обновить что-то), а Putch (частичное обновление)
    // хоть updateProductDto == CreateProductDto - все равно нужно создавать отдельный класс
    @Put(':id') // какой элемент по id следует изменить
    async update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) { 
        return `Update: ${id}`
    }

    //* Patch - запрос (частичное обновление)
    @Patch(':id') // какой элемент по id следует изменить
    async patch(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) { 
        return `Patch: ${id}`
    }

    
}
