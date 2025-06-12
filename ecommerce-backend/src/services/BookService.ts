import { BookRepository } from "../repositories/BookRepository";
import { BookModel } from "../models/BookModel";

export class BookService {
    static async createBook(title: string, author: string, Description: string, Price: number, Stock: number, ImageUrl: string, Category: string): Promise<BookModel> {
        if (!title || !author || !Description || !Price || !Stock || !ImageUrl) {
            throw new Error('Todos los campos son obligatorios');
        }
        const book = new BookModel(
            title,
            author,
            Description,
            Price,
            Stock,
            ImageUrl,
            Category
        );
        const BookCreated = await BookRepository.createBook(book);
        return BookCreated;
    };
    
    static async getBookByIsbn(id: number): Promise<BookModel | null> {
        return await BookRepository.getBookById(id);
    };
    static async getAllBooks() {
        return await BookRepository.getAllBooks();
    };
    static async updateData(isbn: string, updatedData: Partial<BookModel>): Promise<BookModel | null> {
        return await BookRepository.updateBook(isbn, updatedData);
    }
    static async deleteBook(isbn: string): Promise<void> {
        try {
            await BookRepository.deleteBook(isbn);
        } catch (error) {
            throw new Error(`Error al eliminar el libro: ${error}`);
        }
    }
}