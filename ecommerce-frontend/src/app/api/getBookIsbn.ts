export async function getBookId(id: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/book/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error('libro inexistente');
    }

    return await response.json();
}