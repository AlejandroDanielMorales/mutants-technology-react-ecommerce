import React from 'react';
import './ShoppingCartModal.css';

export default function ShoppingCartModal({ cartItems, toggleCart, handleRemoveFromCart }) {
    return (
        <div className="modal-overlay" onClick={toggleCart}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Tu Compra</h2>
                <button className="close-btn" onClick={toggleCart}>X</button>
                
                {cartItems.length === 0 ? (
                    <p>El carrito está vacío</p>
                ) : (
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-img" />
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>Precio: ${item.price}</p>
                                    <button onClick={() => handleRemoveFromCart(index)}>Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
