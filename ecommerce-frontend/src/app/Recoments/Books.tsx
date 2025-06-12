"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import CustomCartBook from "@/components/CustomCardBook";
import { fetchBooks } from "../api/Books";

const Book = () => {
	const router = useRouter();
	const [books, setBooks] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [randomBooks, setRandomBooks] = useState<any[]>([]);

	useEffect(() => {
		const getBooks = async () => {
			try {
				const books = await fetchBooks();
				setBooks(books);
				const shuffled = [...books].sort(() => Math.random() - 0.5);
				setRandomBooks(shuffled.slice(0, 3));
			} finally {
				setLoading(false);
			}
		};
		getBooks();
	}, []);

	const handleInformation = (id: number) => {
		router.push(`/books/${id}`);
	};

	if (loading) {
		return (
			<Layout>
				<div className="w-full h-full flex justify-center items-center">
					<p>Cargando...</p>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="w-full h-full flex justify-center items-center mx-4">
				{randomBooks.map((book) => (
					<CustomCartBook
						key={book.id}
						souce={book.imageUrl}
						titulo={book.title}
						author={book.author}
						Price={book.price}
						categoria={book.category}
						Information={() => handleInformation(book.id)}
					/>
				))}
			</div>
		</Layout>
	);
};

export default Book;
