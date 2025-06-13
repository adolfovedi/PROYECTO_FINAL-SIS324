// src/app/books/Books.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // ¡Importante: Importa Link!
import Layout from "@/components/Layout";
import CustomCardBook from "@/components/CustomCardBook";
// Ajusta esta ruta si tu archivo Books.ts no está en app/api
import { fetchBooks } from "@/app/api/Books"; // Verifica esta ruta de importación

interface BookItem {
    id: string; // Asegúrate de que el ID es un string si así lo esperas en [id]/page.tsx
    title: string;
    author: string;
    price: number;
    imageUrl: string;
    category: string;
    description?: string;
}

const BooksPage = () => {
    const [books, setBooks] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const fetchedBooks: BookItem[] = await fetchBooks();
                // --- DEBUG: LOG DE LIBROS OBTENIDOS ---
                console.log("src/app/books/Books.tsx - Libros obtenidos de la API:", fetchedBooks);
                // --- FIN DEBUG ---
                setBooks(fetchedBooks);
            } catch (error) {
                console.error("src/app/books/Books.tsx - Error al cargar los libros:", error);
            } finally {
                setLoading(false);
            }
        };
        getBooks();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="w-full h-full flex justify-center items-center text-xl font-semibold">
                    <p>Cargando lista de libros...</p>
                </div>
            </Layout>
        );
    }

    if (books.length === 0 && !loading) {
        return (
            <Layout>
                <div className="w-full h-full flex justify-center items-center text-xl font-semibold">
                    <p>No hay libros disponibles en este momento.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="w-full h-full flex-wrap flex justify-center items-center mx-4">
                {books.map((book) => (
                    // === PUNTO CRÍTICO: Envuelve CustomCardBook con <Link> para la navegación ===
                    // El 'href' debe coincidir con la estructura de tu carpeta dinámica [id]
                    <Link key={book.id} href={`/books/${book.id}`} passHref>
                        <CustomCardBook
                            id={book.id}
                            imageUrl={book.imageUrl}
                            title={book.title}
                            author={book.author}
                            price={book.price}
                            category={book.category}
                        />
                    </Link>
                ))}
            </div>
        </Layout>
    );
};

export default BooksPage;