//Imports
import { useState } from 'react';

//Product Images
import ip16img from '../../assets/ip16.png';
import ip14img from '../../assets/ip14.png';
import ip10img from '../../assets/ip10.png';
import galaxyimg from '../../assets/galaxy.png';
import nokiaimg from '../../assets/nokia.png';
import xiaomiimg from '../../assets/xiaomi.png';

const products = [
    { id: 1, name: 'iPhone 16', price: 500, image: ip16img },
    { id: 2, name: 'iPhone 14', price: 300, image: ip14img },
    { id: 3, name: 'iPhone 10', price: 275, image: ip10img },
    { id: 4, name: 'Samsung Galaxy', price: 200, image: galaxyimg },
    { id: 5, name: 'Nokia', price: 150, image: nokiaimg },
    { id: 6, name: 'Xiaomi', price: 100, image: xiaomiimg }
];

function Demo1() {
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === product.id);

            if (existingItem) {
                return currentCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentCart, { ...product, quantity: 1 }];
        });
        window.alert(`${product.name} added to cart!`);
    }

    function removeFromCart(productId) {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    }

    function updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart(currentCart =>
            currentCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <div className="container row">
            <section className="products column col-12 col-lg-9">
                <h2>Our Products</h2>
                <div className="product-list row">
                    {products.map(product => (
                        <div className="product-card column col-12 col-md-6 col-lg-4" key={product.id}>
                            <img className="product-image" src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p className="price">${product.price.toFixed(2)}</p>
                            <button
                                className="btn-add"
                                type="button"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <aside className="cart-sidebar column col-12 col-lg-3">
                <h2>Your Cart</h2>
                <div className="cart-items">
                    {cart.map(item => (
                        <div className="cart-item" key={item.id}>
                            <div className="item-info">
                                <h4>{item.name}</h4>
                                <img className="product-image" src={item.image} alt={item.name} />
                                <p>${item.price.toFixed(2)}</p>
                            </div>
                            <div className="item-controls">
                                <button
                                    className="btn-quantity"
                                    type="button"
                                    aria-label={`Decrease ${item.name} quantity`}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <span className="quantity">{item.quantity}</span>
                                <button
                                    className="btn-quantity"
                                    type="button"
                                    aria-label={`Increase ${item.name} quantity`}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                                <button
                                    className="btn-remove"
                                    type="button"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-totals">
                    <p>Subtotal: $<span>{subtotal.toFixed(2)}</span></p>
                    <p>Tax (10%): $<span>{tax.toFixed(2)}</span></p>
                    <p><strong>Total: $<span>{total.toFixed(2)}</span></strong></p>
                </div>
            </aside>
        </div>
    );
}

export default Demo1;
