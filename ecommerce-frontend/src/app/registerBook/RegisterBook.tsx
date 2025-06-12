"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerBook } from "@/app/api/RegisterBook";

const BookForm: React.FC = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		description: "",
		stock: 0,
		price: 0,
		imageUrl: "",
		category: "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await registerBook(
				formData.title,
				formData.author,
				formData.description,
				formData.price,
				formData.stock,
				formData.imageUrl,
				formData.category
			);
			alert("Book registered successfully");
			router.refresh();
		} catch (error) {
			alert("Error registering book");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="text-black space-y-4 p-4 bg-white rounded shadow-md max-w-md mx-auto"
		>
			<div>
				<label htmlFor="title" className="block font-bold">
					Title:
				</label>
				<input
					type="text"
					id="title"
					name="title"
					value={formData.title}
					onChange={handleChange}
					className="w-full border rounded p-2"
					required
				/>
			</div>
			<div>
				<label htmlFor="author" className="block font-bold">
					Author:
				</label>
				<input
					type="text"
					id="author"
					name="author"
					value={formData.author}
					onChange={handleChange}
					className="w-full border rounded p-2"
					required
				/>
			</div>
			<div>
				<label htmlFor="description" className="block font-bold">
					Description:
				</label>
				<textarea
					id="description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					className="w-full border rounded p-2"
					required
				/>
			</div>
			<div>
				<label htmlFor="stock" className="block font-bold">
					Stock:
				</label>
				<input
					type="number"
					id="stock"
					name="stock"
					value={formData.stock}
					onChange={handleChange}
					className="w-full border rounded p-2"
					required
				/>
			</div>
			<div>
				<label htmlFor="price" className="block font-bold">
					Price:
				</label>
				<input
					type="number"
					id="price"
					name="price"
					value={formData.price}
					onChange={handleChange}
					className="w-full border rounded p-2"
					step="0.01"
					required
				/>
			</div>
			<div>
				<label htmlFor="imageUrl" className="block font-bold">
					Image URL:
				</label>
				<input
					type="text"
					id="imageUrl"
					name="imageUrl"
					value={formData.imageUrl}
					onChange={handleChange}
					className="w-full border rounded p-2"
					required
				/>
			</div>
			<div>
				<label htmlFor="category" className="block font-bold">
					Category:
				</label>
				<select
					id="category"
					name="category"
					value={formData.category}
					onChange={handleChange}
					className="w-full border rounded p-2"
					required
				>
					<option value="">Select a Category</option>
					<option value="Fiction">Fiction</option>
					<option value="Non-Fiction">Non-Fiction</option>
					<option value="Science">Science</option>
					<option value="Technology">Technology</option>
					<option value="Biography">Biography</option>
					<option value="History">History</option>
					<option value="Fantasy">Fantasy</option>
					<option value="Mystery">Mystery</option>
					<option value="Romance">Romance</option>
					<option value="Self-Help">Self-Help</option>
				</select>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white p-2 rounded w-full"
			>
				Register Book
			</button>
		</form>
	);
};

export default BookForm;
