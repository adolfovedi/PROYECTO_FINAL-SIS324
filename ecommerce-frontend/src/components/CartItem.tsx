import React, { useState } from "react";
import DolarIcon from "@/assets/icons/dolarIcon";
import BasuraIcon from "@/assets/icons/basuraIcon";
import AddProduct from "@/assets/icons/addProduct";
import cartUtils from "@/utils/cartUtils";
import buyBook from "@/app/api/comprar";
import Cookies from "js-cookie";
import decodeJWT from "@/utils/extractInformationUser";

interface CartItemProps {
	id: number;
	quantity: number;
	title: string;
	price: number;
	onRemove: (id: number) => void;
}
const CartItem: React.FC<CartItemProps> = ({
	id,
	quantity,
	title,
	price,
	onRemove,
}) => {
	const id_book = id;
	const [itemQuantity, setItemQuantity] = useState(quantity);

	const handleDelete = () => {
		cartUtils.removeFromCart(id);
		const updatedQuantity = itemQuantity - 1;

		if (updatedQuantity > 0) {
			setItemQuantity(updatedQuantity);
		} else {
			setItemQuantity(0);
			onRemove(id);
		}
	};

	const handleDeleteAll = () => {
		cartUtils.removeFromCart(id);
		setItemQuantity(0);
		onRemove(id);
	};

	const handleAdd = () => {
		cartUtils.addToCart({ id, name: title, price });
		setItemQuantity(itemQuantity + 1);
	};

	const token = Cookies.get("token")?.toString();
	const id_user = token ? parseInt(decodeJWT(token).id.toString()) : 0;

	const handlebuyBook = (
		IdUser: number,
		IdBook: number,
		quantity: number,
		Total: number
	) => {
		try {
			buyBook(IdUser, IdBook, quantity, Total);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="justify-items-center place-items-center grid grid-cols-[.5fr,3fr,1fr,1fr]">
			<div>{itemQuantity}</div>
			<div>{title}</div>
			<div className=" my-2 flex flex-row">
				<div
					className="mx-1 p-1 rounded-full bg-yellow-400 hover:bg-yellow-600 hover:scale-110"
					onClick={() => {
						handleDeleteAll();
						handlebuyBook(
							id_user,
							id_book,
							itemQuantity,
							itemQuantity * price
						);
						window.location.href = "/payment";
					}}
				>
					<DolarIcon className="w-7" />
				</div>
				<div
					className="mx-1 p-1 rounded-full bg-red-600 hover:bg-red-500 hover:scale-110"
					onClick={handleDelete}
				>
					<BasuraIcon className="w-7" />
				</div>
				<div
					className="rounded-full bg-green-600 hover:bg-green-400 hover:scale-110"
					onClick={handleAdd}
				>
					<AddProduct className="w-9" />
				</div>
			</div>
			<div>{Math.round(itemQuantity * price * 100) / 100 || 0}</div>
		</div>
	);
};

export default CartItem;
