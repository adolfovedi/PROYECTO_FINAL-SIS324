import React, { useEffect } from "react";

interface NotificationProps {
	element: string;
	onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ element, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);
		return () => clearTimeout(timer);
	}, [onClose]);
	return (
		<div className="bg-green-200 rounded-xl w-max h-10 flex flex-col z-10 p-2">
			<p>
				El libro {element} se añadido al carrito de compras
			</p>
		</div>
	);
};

export default Notification;
