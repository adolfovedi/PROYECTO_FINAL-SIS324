export async function getPurchasesById(id: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/compras/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('libro inexistente');
    }

    return await response.json();
}