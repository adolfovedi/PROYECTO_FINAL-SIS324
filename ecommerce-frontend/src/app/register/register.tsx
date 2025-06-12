"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { register } from "@/app/api/register";
import CustomInput from "@/components/CustomInput";
import Layout_forms from "@/components/Layout_forms";

function RegisterPage() {
	const router = useRouter();

	const [Name, setName] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [error, setError] = React.useState("");
	const [success, setSuccess] = React.useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		if (!Name || !username || !email || !password) {
			setError("error: Campos vacíos");
			return;
		}
		try {
			await register(Name, username, email, password);
			setSuccess("Usuario registrado con éxito");
			setEmail("");
			setName("");
			setPassword("");
			setUsername("");
			setTimeout(() => {
				router.push("/login");
			}, 2000);
		} catch (err: any) {
			setError(err.message);
		}
	};
	const login = () => {
		router.push("/login");
	};
	return (
		<Layout_forms onSubmit={handleSubmit} titulo="Register">
			<CustomInput
				type="text"
				placeholder="Nombre"
				value={Name}
				onChange={(e) => setName(e.target.value)}
				aria-label="Nombre"
			/>
			<CustomInput
				type="text"
				placeholder="nombre de usuario"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				aria-label="nombre de usuario"
			/>
			<CustomInput
				type="email"
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				aria-label="email"
			/>
			<CustomInput
				type="password"
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				aria-label="password"
			/>
			<div className="flex justify-between items-center h-1/5">
				<p
					onClick={login}
					className="font-semibold text-blue-600 hover:text-blue-700 hover:cursor-pointer hover:scale-105"
				>
					iniciar sesión
				</p>
				<input
					type="submit"
					value="Crear Cuenta"
					className="bg-blue-600 text-white text-[15px] p-3 font-bold rounded-xl w-auto border-none cursor-pointer hover:bg-blue-500 hover:text-black"
				/>
			</div>
			{error && <p className="text-red-500 text-left mt-1">{error}</p>}
			{success && (
				<p className="text-green-500 text-left mt-1">{success}</p>
			)}
		</Layout_forms>
	);
}

export default RegisterPage;
