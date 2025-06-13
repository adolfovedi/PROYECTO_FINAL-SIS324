// src/components/BookDetails.tsx
"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import cartUtils from "@/utils/cartUtils";
import Notification from "./Notification";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Importar el componente Image de Next.js

interface BookDetailsProps { // Cambié el nombre de la interfaz para evitar conflicto con el nombre del componente
  id: number;
  Title: string;
  Author: string;
  Description: string;
  Price: number;
  Category: number | string; // Permitir number (ID) o string (nombre)
  imageUrl: string;
}

// Mapa de categorías si las recibes como ID numérico y necesitas el nombre
const categoryMap: { [key: number]: string } = {
    1: "Classic Literature",
    2: "Fantasy",
    3: "Romance",
    4: "Technology",
    5: "Self-Help",
    // Agrega todas tus categorías aquí
};

const BookDetails: React.FC<BookDetailsProps> = ({
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
    if (!isLoggedIn) {
      router.push("/login"); // Redirigir al login si no está logueado
      return;
    }
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

  // Determinar el nombre de la categoría a mostrar
  const displayCategory = typeof Category === 'number' ? categoryMap[Category] || 'Desconocida' : Category;

  return (
    // Ajusta los anchos para que el contenido ocupe más espacio si es necesario
    // w-full max-w-5xl mx-auto p-4 para centrar y dar un ancho máximo
    <div className="h-auto w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-start p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start m-4 w-full">
        {/* Contenedor de la imagen */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10">
          <div className="h-80 w-64 md:w-72 lg:w-80 rounded-lg flex justify-center items-center">
            <Image
              src={imageUrl}
              alt={Title}
              width={288} // w-72 en Tailwind (72 * 4 = 288px)
              height={432} // Ajusta para mantener la proporción, por ejemplo, 1.5 veces el ancho
              className="rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.12),_0_1px_2px_rgba(0,0,0,0.24)] object-cover"
              priority // Para imágenes principales en una página de detalles
            />
          </div>
        </div>

        {/* Contenedor de los detalles del libro */}
        <div className="ml-0 md:ml-6 w-full flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-extrabold text-5xl md:text-6xl text-gray-800 mb-2">{Title}</h1>
          <p className="font-medium text-xl md:text-2xl text-gray-600 mb-4">{Author}</p>
          <p className="mt-3 text-gray-700 leading-relaxed max-w-prose mb-6">{Description}</p>
          <p className="text-lg text-gray-500 mb-2">Categoria: <span className="font-semibold">{displayCategory}</span></p>
          <br />
          <p className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6">Bs. {Price.toFixed(2)}</p> {/* Formatear precio */}

          {/* Botón de añadir al carrito o iniciar sesión */}
          <div className="w-full">
            {isLoggedIn ? (
              <CustomButton
                className="bg-green-500 p-3 rounded-lg text-white font-bold hover:bg-green-700 transition duration-300 ease-in-out shadow-md"
                onClick={handleAddToCart}
                text="Añadir al carrito"
              />
            ) : (
              <CustomButton
                className="bg-blue-500 p-3 rounded-lg text-white font-bold hover:bg-blue-700 transition duration-300 ease-in-out shadow-md"
                onClick={() => router.push("/login")}
                text="Iniciar sesión para comprar"
              />
            )}
          </div>

          {/* Notificación */}
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