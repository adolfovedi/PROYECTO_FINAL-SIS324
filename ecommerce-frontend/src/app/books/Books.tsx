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

	useEffect(() => {
		const getBooks = async () => {
			try {
				const books = await fetchBooks();
				setBooks(books);
			} finally {
				setLoading(false);
			}
		};
		getBooks();
	}, []);

	const handleInformation = (id: number) => {
		router.push(`/book/${id}`);
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
			<div className="w-full h-full flex-wrap flex justify-center items-center mx-4">
				{books.map((book) => (
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
