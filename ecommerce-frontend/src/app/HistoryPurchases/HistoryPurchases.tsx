"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import PruchasesItem from "@/components/PruchasesItem";
import HistoryIcon from "@/assets/icons/historyIcon";
import Cookies from "js-cookie";
import decodeJWT from "@/utils/extractInformationUser";
import { getPurchasesById } from "@/app/api/getpurchases";

const ShopingCart = () => {
	const router = useRouter();
	const [books, setBooks] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = Cookies.get("token");
		if (!token) {
			router.push("/");
		}
	}, [router]);

	const token = Cookies.get("token")?.toString();
	const id_user = token ? parseInt(decodeJWT(token).id.toString()) : 0;

	useEffect(() => {
		const getBooks = async () => {
			try {
				const books = await getPurchasesById(id_user);
				setBooks(books);
			} finally {
				setLoading(false);
			}
		};
		getBooks();
	}, []);
	return (
		<Layout>
			<div className="w-2/3 h-full p-4">
				<div className="flex flex-row justify-between">
					<div className="flex flex-row justify-center items-center h-max w-max">
						<HistoryIcon className="w-12 h-12" />
						<p className="text-3xl font-bold pl-2">Mi Historial</p>
					</div>
				</div>
				<div className="flex flex-col p-3 text-white bg-blue-700 rounded-3xl my-3">
					<div className="text-xl font-semibold justify-items-center grid grid-cols-[.5fr,3fr,1fr]">
						<p>Cantidad</p>
						<p>Articulo</p>
						<p>precio</p>
					</div>
					<hr className="w-full bg-white h-[2px]" />
					{books.map((item) => (
						<PruchasesItem
							quantity={item.Quantity}
							title={item.Title}
							Total={item.Total}
						/>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default ShopingCart;
