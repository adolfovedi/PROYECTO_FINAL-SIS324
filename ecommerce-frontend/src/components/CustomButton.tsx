import React from "react";

interface CustomButtonProps {
	text: string;
    className?: string;
	onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, className }) => {
	return (
		<button
			className={`p-2 rounded-lg ${
                className ? className : ""
            }`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default CustomButton;
