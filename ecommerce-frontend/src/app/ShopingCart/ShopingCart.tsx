"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {useRouter } from "next/navigation";
import CartItems from "@/components/CartItem";
import CarritoIcon from "@/assets/icons/CarritoIcon";
import cartUtils, { Product } from "@/utils/cartUtils";
import buyBook from "@/app/api/comprar";
import Cookies from "js-cookie";
import decodeJWT from "@/utils/extractInformationUser";

const ShopingCart = () => {
	const router = useRouter();
	const [cart, setCart] = useState<Product[]>([]);
	useEffect(() => {
		setCart(cartUtils.getCart());
	}, []);

	useEffect(() => {
		const token = Cookies.get("token");
		if (!token) {
			router.push("/");
		}
	}, [router]);

	const handleClearCart = (id: number) => {
		const updatedCart = cart.filter((p) => p.id != id);
		setCart(updatedCart);
		cartUtils.removeFromCart(id);
	};

	const handleBuyAll = async () => {
		if (cart.length === 0) return;
		try {
			const promises = cart.map((item) =>{
				let total = item.price * (item.quantity ?? 1);
				buyBook(
					id_user,
					item.id,
					item.quantity || 1,
					total
				)}
			);
			await Promise.all(promises);
			setCart([]);
			cartUtils.clearCart();
			alert("Compra realizada con exito");
		} catch (e) {
			console.error("Error al comprar", e);
			alert("Error al realizar la compra porfavor intente de nuevo");
		}
	};

	const token = Cookies.get("token")?.toString();
	const id_user = token ? parseInt(decodeJWT(token).id.toString()) : 0;

	return (
		<Layout>
			<div className="w-2/3 h-full p-4">
				<div className="flex flex-row justify-between">
					<div className="flex flex-row justify-center items-center h-max w-max">
						<CarritoIcon className="w-12 h-12" />
						<p className="text-3xl font-bold pl-2">Mi Carrito</p>
					</div>
				</div>
				<div className="flex flex-col p-3 text-white bg-blue-700 rounded-3xl my-3">
					<div className="text-xl font-semibold justify-items-center grid grid-cols-[.5fr,3fr,1fr,1fr]">
						<p>Cantidad</p>
						<p>Articulo</p>
						<p>Operaciones</p>
						<p>precio</p>
					</div>
					<hr className="w-full bg-white h-[2px]" />
					{cartUtils.getCart().map((item) => (
						<CartItems
							id={item.id}
							key={item.id}
							quantity={item.quantity ?? 1}
							title={item.name}
							price={item.price}
							onRemove={handleClearCart}
						/>
					))}
				</div>
				<div className="flex justify-end">
					<button
						disabled={cart.length === 0}
						className={`${
							cart.length === 0
								? "bg-gray-400 cursor-not-allowed"
								: "bg-[yellow] hover:bg-[rgb(255,255,0,0.5)]"
						} font-bold border-none py-3 px-5 rounded-lg cursor-pointer`}
						onClick={() => {
							handleBuyAll();
							window.location.href = "/payment";
						}}
					>
						Comprar todo Bs.
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default ShopingCart;
