"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import cartUtils from "@/utils/cartUtils";
import Notification from "./Notification";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface BookDetails {
	id: number;
	Title: string;
	Author: string;
	Description: string;
	Price: number;
	Category: number;
	imageUrl: string;
}

const BookDetails: React.FC<BookDetails> = ({
	id,
	Title,
	Author,
	Description,
	Price,
	Category,
	imageUrl,
}) => {
	const router = useRouter();
	const [notification, setNotification] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);
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
		<div className="h-auto w-2/3 flex justify-center items-center">
			<div className="h-max w-max flex flex-row m-4">
				<div>
					<div className="h-64 w-64 rounded-lg m-2 flex justify-center items-center">
						<img
							src={imageUrl}
							alt={Title}
							className={`w-auto h-64 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.12),_0_1px_2px_rgba(0,0,0,0.24)]`}
						/>
					</div>
				</div>
				<div className="ml-6 w-full h-full flex flex-col">
					<h1 className="font-extrabold text-6xl">{Title}</h1>
					<p className="font-medium text-xl">{Author}</p>
					<p className="mt-3">{Description}</p>
					<p>Categoria: {Category}</p>
					<br />
					<p className="text-2xl">Bs. {Price}</p>
					<div className="w-full h-full">
						{isLoggedIn ? (
							<CustomButton
								className="bg-green-500 p-1 rounded-lg m-1 hover:bg-green-800 hover:text-white"
								onClick={() => handleAddToCart()}
								text="añadir al carrito"
							/>
						) : (
							<CustomButton
								className="bg-blue-500 p-1 rounded-lg m-1 hover:bg-blue-800 hover:text-white"
								onClick={() => router.push("/login")}
								text="iniciar sesión para comprar"
							/>
						)}
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
