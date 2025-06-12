export interface Product {
    id: number;
    name: string;
    price: number;
    quantity?: number;
}

const cartUtils = {
    isClient: typeof window !== 'undefined',

    addToCart: (product: Product): void => {
        if (cartUtils.isClient) {
            const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingProduct = cart.find((p) => p.id === product.id);

            if (!existingProduct) {
                cart.push({ ...product, quantity: 1 });
            } else {
                existingProduct.quantity = (existingProduct.quantity || 0) + 1;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
        }
    },

    getCart: (): Product[] => {
        if (!cartUtils.isClient) {
            return [];
        }
        return JSON.parse(localStorage.getItem('cart') || '[]');
    },

    removeFromCart: (productId: number): void => {
        if (cartUtils.isClient) {
            const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingProduct = cart.find((p) => p.id === productId);

            if (existingProduct && existingProduct.quantity && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            } else {
                const updatedCart = cart.filter((p) => p.id != productId);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
        }
    },

    clearCart: (): void => {
        if (cartUtils.isClient) {
            localStorage.removeItem('cart');
        }
    }
}

export default cartUtils;