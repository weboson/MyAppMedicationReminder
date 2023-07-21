// данные для метода Post - import в products.controller.ts
// шаблон данных, то есть ожидаются такие поля и такие типы данных для создания объекта
export class CreateProductDto {
    // какие поля мы ожидаем
    // readonly - только для чтения
    readonly title: string 
    readonly price: number 
}