import React from "react";

interface PurchaisesItemProps {
	quantity: number;
	title: string;
	Total: number;
}
const PurchaisesItem: React.FC<PurchaisesItemProps> = ({
	quantity,
	title,
	Total
}) => {
	return (
		<div className="justify-items-center place-items-center grid grid-cols-[.5fr,3fr,1fr]">
			<div className="p-4">{quantity}</div>
			<div className="p-4">{title}</div>
			<div className="p-4">{Total}</div>
		</div>
	);
};

export default PurchaisesItem;
