export const registerBook = async (title: string, author: string, description: string, price: number, stock: number, imageUrl: string, Category: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "title": `${title}`,
            "author": `${author}`,
            "description": `${description}`,
            "price": `${price}`,
            "stock": `${stock}`,
            "imageUrl": `${imageUrl}`,
            "Category": `${Category}`
        })
    });
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error al registrar usuario');
    }

    return await response.json();
}