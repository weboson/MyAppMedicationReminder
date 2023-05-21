// данные для метода Delete - import в products.controller.ts
// Хоть код идентичен CreateProductDto - все равно нужно отдельный класс
export class UpdateProductDto {
    readonly title: string 
    readonly price: number 
}