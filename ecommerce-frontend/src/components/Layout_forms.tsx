"use client";
import React from "react";

interface CustomInputProps {
	onSubmit: (e: React.FormEvent) => void;
	titulo: string;
	children?: React.ReactNode;
}

const Layout_forms: React.FC<CustomInputProps> = ({
	onSubmit,
	titulo,
	children,
}) => {
	return (
		<div className="flex bg-custom-gradient m-0 h-screen">
			<div className="h-[60vh] w-1/3 flex m-auto border-none backdrop-blur-md shadow-[0_0_10px_5px_rgb(148,146,146)] rounded-3xl">
				<form
					onSubmit={onSubmit}
					className="w-full text-xs bg-[rgb(249,249,249)] h-full flex flex-col justify-center p-16 rounded-3xl"
				>
					<div className="text-black text-2xl text-center my-6 mx-auto h-1/5 font-extrabold font-serif">
						<h2>{titulo}</h2>
					</div>
                    {children}
				</form>
			</div>
		</div>
	);
};

export default Layout_forms;
