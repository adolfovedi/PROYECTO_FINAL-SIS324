'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItems from "@/components/CartItem"; 
import CarritoIcon from "@/assets/icons/CarritoIcon";
import cartUtils, { Product } from "@/utils/cartUtils"; 
import buyBook from "@/app/api/comprar"; 
import Cookies from "js-cookie";
import decodeJWT from "@/utils/extractInformationUser";
import Layout from "@/components/Layout"; 

const ShopingCart = () => {
    const router = useRouter();
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const loadedCart = cartUtils.getCart(); // Obtén el carrito primero
        setCart(loadedCart); // Actualiza el estado
        // --- ¡¡¡ ESTA LÍNEA ES CRÍTICA PARA LA DEPURACIÓN !!! ---
        console.log("Contenido del carrito cargado (ShopingCart.tsx):", loadedCart); 

        const token = Cookies.get("token");
        if (!token) {
            router.push("/");
        }
    }, [router]);

    const handleRemoveItem = (productId: number) => {
        cartUtils.removeFromCart(productId);
        setCart(cartUtils.getCart());
    };

    const handleAddQuantity = (productToIncrease: Product) => {
        cartUtils.addToCart(productToIncrease);
        setCart(cartUtils.getCart());
    };

    const handleBuyAll = async () => {
        if (cart.length === 0) {
            alert("El carrito está vacío. Agrega productos para comprar.");
            return;
        }
        try {
            const token = Cookies.get("token")?.toString();
            const id_user = token ? parseInt(decodeJWT(token).id.toString()) : 0;

            const promises = cart.map((item) => {
                let total = item.price * (item.quantity || 1);
                return buyBook(
                    id_user,
                    item.id,
                    item.quantity || 1,
                    total
                );
            });
            await Promise.all(promises);
            setCart([]); 
            cartUtils.clearCart(); 
            alert("Compra realizada con éxito");
            router.push("/payment"); 
        } catch (e) {
            console.error("Error al comprar", e);
            alert("Error al realizar la compra por favor intente de nuevo");
        }
    };

    const totalCartPrice = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 0)), 0).toFixed(2);

    return (
        <Layout>
            <div className="w-2/3 h-full p-4 mx-auto">
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="flex flex-row justify-center items-center h-max w-max">
                        <CarritoIcon className="w-12 h-12 text-gray-800" />
                        <p className="text-3xl font-bold pl-2 text-gray-800">Mi Carrito</p>
                    </div>
                </div>
                <div className="flex flex-col p-3 text-white bg-blue-700 rounded-3xl my-3 shadow-lg">
                    <div className="text-xl font-semibold justify-items-center grid grid-cols-[.5fr,3fr,1fr,1fr] p-2">
                        <p>Cantidad</p>
                        <p>Artículo</p>
                        <p>Operaciones</p>
                        <p>Precio</p>
                    </div>
                    <hr className="w-full bg-white h-[2px]" />
                    {cart.length === 0 ? (
                        <p className="text-center text-white py-4">El carrito está vacío.</p>
                    ) : (
                        cart.map((item) => (
                            <CartItems
                                id={item.id} 
                                key={item.id} 
                                quantity={item.quantity || 1} 
                                title={item.title} 
                                price={item.price} 
                                imageUrl={item.imageUrl} 
                                onRemove={handleRemoveItem} 
                                onDecrease={() => handleRemoveItem(item.id)} 
                                onAdd={() => handleAddQuantity(item)} 
                            />
                        ))
                    )}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        disabled={cart.length === 0}
                        className={`${
                            cart.length === 0
                                ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                                : "bg-yellow-500 hover:bg-yellow-600 text-gray-800" 
                        } font-bold border-none py-3 px-5 rounded-lg cursor-pointer shadow-md transition duration-200`}
                        onClick={handleBuyAll} 
                    >
                        Comprar todo Bs. {totalCartPrice}
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ShopingCart;
