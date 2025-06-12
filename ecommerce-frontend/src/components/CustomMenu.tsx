import React from "react";

interface CustomMenuProps {
	title: string;
	onClick: () => void;
	icon: React.ReactNode;
	className?: string;
}

const CustomMenu: React.FC<CustomMenuProps> = ({
	title,
	onClick,
	icon,
	className,
}) => {
	return (
		<div className="flex items-center cursor-pointer" onClick={onClick}>
			{icon ?(
				<span className="m-1 w-10 h-10">{icon}</span>
			) : null}
			<p>{title}</p>
		</div>
	);
};

export default CustomMenu;
