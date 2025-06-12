export const register = async (Name: string, username: string, email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name":`${Name}`,
            "username":`${username}`,
            "email":`${email}`,
            "password":`${password}`
        })
    });
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error al registrar usuario');
    }

    return await response.json();
};