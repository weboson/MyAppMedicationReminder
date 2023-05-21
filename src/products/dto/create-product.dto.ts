// данные для метода Post - import в products.controller.ts
export class CreateProductDto {
    // какие поля мы ожидаем
    // readonly - только для чтения
    readonly title: string 
    readonly price: number 
}