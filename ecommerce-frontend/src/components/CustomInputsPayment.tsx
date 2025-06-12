import React from "react";

interface CustomInputProps {
	TitleLabel: string;
	type: string;
	placeholder?: string;
    props?: any;
}

const CustomInputPayment: React.FC<CustomInputProps> = ({
	TitleLabel,
	type,
	placeholder,
    props,
}) => {
	return (
		<div className="mb-4">
			<label className="block mt-1 text-[#666]"> {TitleLabel} </label>
			<input
				className="w-full p-[10px] border-black border-solid border-[1px] rounded-md"
				type={type}
				placeholder={placeholder}
				required
                {...props}
			/>
		</div>
	);
};

export default CustomInputPayment;
