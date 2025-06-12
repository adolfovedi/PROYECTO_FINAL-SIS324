import React from "react";

interface CustomCartBookProps {
	souce: string;
	titulo: string;
	author: string;
	Price: number;
	categoria: string;
	Information: () => void;
}

const CustomCartBook: React.FC<CustomCartBookProps> = ({
	souce,
	titulo,
	author,
	Price,
	categoria,
	Information,
}) => {
	const [isLoad, setIsLoad] = React.useState(true);
	return (
		<div className="w-52 h-[408px] p-[.8em] bg-[#f5f5f5] relative overflow-visible shadow-[0_1px_3px_rgba(0,0,0,0.12),_0_1px_2px_rgba(0,0,0,0.24)] rounded-xl flex flex-col items-center justify-between m-2 text-center">
			<div className="flex flex-col items-center justify-center">
				<div
					className={`h-36 w-auto rounded-lg m-2 ${
						isLoad ? "bg-gray-200 animate-pulse" : ""
					}`}
				>
					<img
						className={`rounded-lg h-40 w-auto transition-all object-cover duration-300 ease-in-out transform hover:scale-105 ${
							isLoad ? "opacity-100" : "opacity-100"
						}`}
						src={souce}
						alt="cargando ..."
						onLoad={() => setIsLoad(false)}
					></img>
				</div>
				<h2 className="pt-4 font-bold text-gray-900">{titulo}</h2>
			</div>
			<div className=" w-full flex flex-col items-center">
				<p className="mb-2 w- text-base text-center bg-slate-400 p-1 px-2 rounded-full">{categoria}</p>
				<span className="text-sm text-gray-700 font-medium">{author}</span>
				<span className="text-sm text-gray-700 font-medium">Bs. {Price}</span>
				<span
					className="w-full text-left text-blue-600 hover:text-blue-800 hover:cursor-pointer"
					onClick={Information}
				>
					ver más
				</span>
			</div>
		</div>
	);
};

export default CustomCartBook;
