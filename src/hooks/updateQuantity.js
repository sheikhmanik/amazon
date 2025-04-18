export default function updateQuantity(id, quantity) {
    let cartProducts = [];
    try {
        const stored = localStorage.getItem('cartProducts');
        cartProducts = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Can't fetch the products data..", e);
        cartProducts = [];
    }
}