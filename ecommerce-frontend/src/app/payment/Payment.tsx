"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import CustomInputPayment from "@/components/CustomInputsPayment";

function PaymentPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const handlerSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoaded(true);
		setTimeout(() => {
			setIsLoaded(false);
			setIsModalOpen(true);
		}, 3000);
	};

	const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            window.location.href = "/ShopingCart";
        }, 1000);
	};
	return (
		<Layout>
			<article className="w-full h-2/3 flex justify-center items-center">
				<div className="bg-white m-5 p-5 rounded-lg w-2/4 overflow-y-auto max-h-[90vh]">
					<h2 className="text-2xl font-bold text-center text-[#333] mb-5">
						Formulario de Pago
					</h2>
					<CustomInputPayment
						TitleLabel="Nombre del titular"
						type="text"
						placeholder="nombre completo"
					/>
					<CustomInputPayment
						TitleLabel="Correo Electrónico"
						type="email"
						placeholder="tuemail@ejemplo.com"
					/>
					<h3 className="text-xl font-bold text-center text-[#333] mb-5">
						Dirección de Facturación
					</h3>
					<CustomInputPayment
						TitleLabel="Direccion"
						type="text"
						placeholder="calle, numero y colonia"
					/>
					<CustomInputPayment
						TitleLabel="Ciudad"
						type="text"
						placeholder="tu ciudad"
					/>
					<CustomInputPayment
						TitleLabel="Estado/Pronvincia"
						type="text"
						placeholder="Tu estado o provincia"
					/>
					<CustomInputPayment
						TitleLabel="Código Postal"
						type="text"
						placeholder="12345"
						props={{ maxLength: 5 }}
					/>
					<h3 className="text-xl font-bold text-center text-[#333] mb-5">
						Método de Pago
					</h3>
					<div className="mb-4">
						<label className="block mt-1 text-[#666]">
							Seleciona un método de pago
						</label>
						<select
							required
							className="w-full p-3 border-[1px] border-solid border-black rounded"
						>
							<option value="tarjeta">
								Tarjeta de Crédito/Débito
							</option>
							<option value="paypal">PayPal</option>
							<option value="transferencia">
								Transferencia Bancaria
							</option>
						</select>
						<CustomInputPayment
							TitleLabel="Numero de tarjeta"
							type="text"
							placeholder="1234 5678 9012 3456"
							props={{ maxLength: 16 }}
						/>
						<CustomInputPayment
							TitleLabel="Fecha de Expiración"
							type="month"
							props={{ maxLength: 5 }}
						/>
						<CustomInputPayment
							TitleLabel="CVV"
							type="text"
							placeholder="123"
							props={{ maxLength: 4 }}
						/>
						<CustomInputPayment
							TitleLabel="Notas"
							type="notas"
							placeholder="Opcional: Escribe cualquier nota o comentario."
							props={{ rows: 4, maxLength: 5, required: false }}
						/>
						<button
							type="submit"
							onClick={handlerSubmit}
							className="w-full bg-blue-500 text-white py-3 rounded mt-5 hover:bg-blue-600 transition"
						>
							{" "}
							pagar
						</button>
					</div>
				</div>
			</article>
			{isLoaded && (
				<div className="bg-black bg-opacity-90 fixed inset-0 flex items-center justify-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
					<svg
						className="text-gray-300 animate-spin"
						viewBox="0 0 64 64"
						fill="none"
						width="64"
						height="64"
					>
						<path
							d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
							stroke="currentColor"
							strokeWidth="5"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
						<path
							d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
							stroke="currentColor"
							strokeWidth="5"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-gray-900"
						></path>
					</svg>
				</div>
			)}

			{/* Modal de éxito */}
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
					<div className="bg-white p-5 rounded-lg text-center w-80">
						<h3 className="mb-4 text-[#333]">¡Pago Exitoso!</h3>
						<p>
							Tu pago ha sido procesado con éxito. ¡Gracias por tu
							compra!
						</p>
						<button
							onClick={closeModal}
							className="bg-[rgb(80,80,247)] text-white p-3 border-none rounded cursor-pointer w-full hover:bg-[rgb(121,121,252)]"
						>
							Cerrar
						</button>
					</div>
				</div>
			)}
		</Layout>
	);
}

export default PaymentPage;
