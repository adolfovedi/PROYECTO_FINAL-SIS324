const buyBook = async (IdUser: number, IdBook: number, quantity: number, Total: number) => {
    console.log(IdUser, IdBook, quantity, Total);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/compra`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "User_Id": IdUser,
            "Book_Id": IdBook,
            "Cantidad": quantity,
            "Total_amount": Total
        })
    });
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error al comprar libro');
    }

    return await response.json();
}

export default buyBook;