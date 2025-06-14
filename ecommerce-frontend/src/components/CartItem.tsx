'use client';

import React from "react";
import DolarIcon from "@/assets/icons/dolarIcon"; 
import BasuraIcon from "@/assets/icons/basuraIcon"; 
import AddProduct from "@/assets/icons/addProduct"; 

// Interfaz para las props del componente CartItem
interface CartItemProps {
    id: number;
    quantity: number;
    title: string; // El nombre del artículo
    price: number; // El precio unitario del artículo
    imageUrl?: string; // Opcional: la URL de la imagen del libro
    onRemove: (id: number) => void; // Para eliminar un ítem completamente
    onDecrease: (id: number) => void; // Para decrementar la cantidad
    onAdd: (id: number) => void; // Para incrementar la cantidad
}

const CartItem: React.FC<CartItemProps> = ({
    id,
    quantity,
    title,
    price,
    imageUrl, // Recibimos la URL de la imagen
    onRemove, // Función para eliminar (decrementa o quita)
    onDecrease, // Para decrementar la cantidad
    onAdd, // Para incrementar la cantidad
}) => {
    // Las operaciones de cartUtils y la compra se manejan en el componente padre (ShopingCart.tsx)
    // Este componente solo se encarga de la UI y de notificar al padre.
    // Ya no hay estado 'itemQuantity' local aquí, se usa la 'quantity' que viene de props.

    const itemTotalPrice = (quantity * price).toFixed(2);

    return (
        <div className="justify-items-center place-items-center grid grid-cols-[.5fr,3fr,1fr,1fr] py-3 border-b border-gray-200 text-gray-800">
            <div>{quantity}</div>
            <div className="flex items-center space-x-4">
                <img
                    src={imageUrl || `https://placehold.co/50x70/E0E0E0/333333?text=Libro`} // Muestra la imagen o un placeholder
                    alt={`Portada de ${title}`}
                    className="w-12 h-16 object-cover rounded-md shadow-sm"
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/50x70/E0E0E0/333333?text=Libro`; }}
                />
                <p className="font-semibold text-base">{title}</p> {/* Aquí se muestra el título */}
            </div>
            <div className=" my-2 flex flex-row space-x-2"> 
                {/* Botón para Comprar (individualmente o por cantidad) */}
                {/* NOTA: La lógica de compra individual debería estar en el padre (ShopingCart.tsx)
                   y ser pasada como prop o manejada centralmente. Aquí solo simulamos. */}
                <div
                    className="p-1 rounded-full bg-yellow-400 hover:bg-yellow-600 hover:scale-110 cursor-pointer"
                    onClick={() => {
                        alert(`Simulando compra de ${quantity} unidad(es) de "${title}" por Bs. ${itemTotalPrice}`);
                        // Aquí deberías notificar al padre para que gestione la compra individual y la eliminación
                        onRemove(id); // Asume que la compra de este ítem implica eliminarlo del carrito
                    }}
                >
                    <DolarIcon className="w-7" />
                </div>
                {/* Botón para Decrementar la cantidad */}
                <div
                    className="p-1 rounded-full bg-red-600 hover:bg-red-500 hover:scale-110 cursor-pointer"
                    // Llama a la función onDecrease que viene de las props (del padre)
                    onClick={() => onDecrease(id)} 
                >
                    {/* Usamos BasuraIcon para "decrementar/eliminar uno", si quantity > 1, decrementa. Si quantity == 1, elimina.
                       La lógica de decisión la maneja el padre. */}
                    <BasuraIcon className="w-7" /> 
                </div>
                {/* Botón para Incrementar la cantidad */}
                <div
                    className="p-1 rounded-full bg-green-600 hover:bg-green-400 hover:scale-110 cursor-pointer"
                    // Llama a la función onAdd que viene de las props (del padre)
                    onClick={() => onAdd(id)} 
                >
                    <AddProduct className="w-9" />
                </div>
            </div>
            <div className="font-bold text-right pr-6">Bs. {itemTotalPrice}</div> {/* Aquí se muestra el precio total por ítem */}
        </div>
    );
};

export default CartItem;
