import { Request, Response } from "express";
import { BookService } from "../services/BookService";
import { BookModel } from "models/BookModel";

export class BookController {
    static async createBook(req: Request, res: Response): Promise<void> {
        try {
            const {title, author, description, price, stock, imageUrl,Category } = req.body;
            const newBook = await BookService.createBook(title, author, description, price, stock, imageUrl, Category);
            res.status(201).json({ book: newBook });
        } catch (error) {
            res.status(400).json({
                message: "Error al crear el libro controller" + error
            });
        }
    }
    static async getBookById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            const book = await BookService.getBookByIsbn(id);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: 'Libro no encontrado' });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el libro controller -> " + error,
            });
        }
    }
    static async getAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const books = await BookService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(400).json({
                message: "Error al obtener los libros controller -> " + error
            });
        }
    };
    static async updateData(req: Request, res: Response): Promise<void> {
        const { isbn } = req.params;
        const updatedData: Partial<BookModel> = req.body;
        try {
            const updatedBook = await BookService.updateData(isbn, updatedData);
            if (updatedBook) {
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({
                    message: 'Libro no encontrado'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error al actualizar el libro controller -> " + error,
            });
        }
    }
    static async deleteBook(req: Request, res: Response): Promise<void> {
        const isbn = req.params.isbn;
        try {
            await BookService.deleteBook(isbn);
            res.status(200).json({
                message: 'Libro eliminado'
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al eliminar el libro controller -> " + error,
            });
        }
    }
}