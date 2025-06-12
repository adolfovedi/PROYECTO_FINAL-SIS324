"use client";
import React, { use, useEffect, useState } from "react";

import Layout from "@/components/Layout";
import Cookies from "js-cookie";
import decodeJWT from "@/utils/extractInformationUser";

const token = Cookies.get("token")?.toString();
const user_name = token ? decodeJWT(token).username.toString() : "";

function HomePage() {
	const [userName, setUserName] = useState<string>("");
	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			const decodedToken = decodeJWT(token);
			if (decodedToken?.username) {
				setUserName(decodedToken.name.toString());
			} else {
				Cookies.remove("token");
			}
		}
	}, []);

	return (
		<Layout>
			<article className="bg-[url(/webp/Welcome.webp)] w-full h-full bg-no-repeat bg-cover bg-center py-[5%] px-0">
				<h1 className="my-0 mx-[20%] text-5xl">
					{user_name !== "" ? `Bienvenido ${userName}` : "Bienvenido"}
				</h1>
				<p className="w-2/4 my-[5%] mx-[20%] text-xl">
					Explora un universo de historias, conocimiento e inspiración
					en nuestra tienda en línea. Ofrecemos una cuidadosa
					selección de libros para todos los gustos: desde fascinantes
					novelas y clásicos inmortales, hasta guías prácticas y las
					últimas tendencias literarias. Nuestro compromiso es
					acercarte el placer de la lectura con comodidad, precios
					justos y un servicio excepcional. ¡Descubre tu próxima gran
					lectura hoy mismo!
				</p>
			</article>
		</Layout>
	);
}

export default HomePage;
