export class BookModel {
    id?: number;
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
    constructor(
        title: string,
        author: string,
        description: string,
        price: number,
        stock: number,
        imageUrl: string,
        category: string,
        id?: number
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.imageUrl = imageUrl
    }
}