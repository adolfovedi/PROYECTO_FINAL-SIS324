import React from "react";

interface CustomInputProps {
	type: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomInput: React.FC<CustomInputProps> = ({
	type,
	placeholder,
	value,
	onChange,
}) => {
	return (
		<div className="w-full mb-3 h-[60%]">
			<input
				className="w-full mb-5 p-[15px] border-2 border-black bg-transparent rounded-full text-black outline-none placeholder-gray-500"
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default CustomInput;
