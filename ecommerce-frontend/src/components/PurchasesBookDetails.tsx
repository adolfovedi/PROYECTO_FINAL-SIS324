"use client";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import cartUtils from "@/utils/cartUtils";
import Notification from "./Notification";

interface BookDetails {
	id: number;
	Isbn: string;
	Title: string;
	Author: string;
	Description: string;
	Price: number;
	Category: number;
	imageUrl: string;
}

const BookDetails: React.FC<BookDetails> = ({
	id,
	Isbn,
	Title,
	Author,
	Description,
	Price,
	Category,
	imageUrl,
}) => {
	const [notification, setNotification] = useState<string | null>(null);

	const handleAddToCart = () => {
		cartUtils.addToCart({
			id,
			name: Title,
			price: Price,
			quantity: 1,
		});
		setNotification(Title);
		setTimeout(() => {
			setNotification(null);
		}, 3000);
	};
	return (
		<div className="h-auto w-full flex justify-center items-center">
			<div className="h-max w-max flex flex-row m-4">
				<div>
					<div className="h-64 w-64 rounded-lg m-2 flex justify-center items-center">
						<img
							src={imageUrl}
							alt={Title}
							className={`w-auto h-64 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.12),_0_1px_2px_rgba(0,0,0,0.24)]`}
						/>
					</div>
					<p className="mt-2 text-center"> ISBN: {Isbn}</p>
				</div>
				<div className="ml-6 w-full h-full flex flex-col">
					<h1 className="font-extrabold text-6xl">{Title}</h1>
					<p className="font-medium text-xl">{Author}</p>
					<p className="mt-3">{Description}</p>
					<p>Categoria: {Category}</p>
					<br />
					<p className="text-2xl">Bs. {Price}</p>
					<div className="w-full h-full">
						<CustomButton
							className="bg-green-500 p-1 rounded-lg m-1 hover:bg-green-800 hover:text-white"
							onClick={() => handleAddToCart()}
							text="añadir al carrito"
						/>
					</div>
					{notification && (
						<Notification
							element={notification}
							onClose={() => setNotification(null)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default BookDetails;
