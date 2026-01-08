//exports
export const CART_KEY = "cart_items";

//functions
export function getCart() { //retrieves card from local storage
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
}

export function saveCart(cart) { //saves cart to local storage
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(productId, qty = 1) { //adds product to cart
    const cart = getCart();
    const found = cart.find(i => i.productId === productId);
    if (found) {
        found.qty =+ qty;
    } else {
        cart.push ({ productId, qty})
    }
    saveCart(cart);
    updateCartBadge();
}

export function getCartCount() { //returns total number of items in cart
    return getCart().reduce((sum, item) => sum + item.qty, 0);}