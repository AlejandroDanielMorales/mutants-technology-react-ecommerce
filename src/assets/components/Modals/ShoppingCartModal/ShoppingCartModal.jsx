import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from '../../../context/OrderContext';
import './ShoppingCartModal.css';

export default function ShoppingCartModal() {
    const {
        cartItems,
        toggleCart,
        handleRemoveFromCart,
        handleQuantityChange,
        totalPrice
    } = useOrder();

    const closeModalAndUpdateStorage = () => {
        toggleCart();
    };

    return (
        <div className="modal-overlay" onClick={closeModalAndUpdateStorage}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Tu Compra</h2>
                <button className="close-btn" onClick={closeModalAndUpdateStorage}>X</button>
                
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
                                    <label htmlFor={`quantity-${index}`}>Cantidad:</label>
                                    <select
                                        id={`quantity-${index}`}
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                    >
                                        {[...Array(10).keys()].map((n) => (
                                            <option key={n + 1} value={n + 1}>{n + 1}</option>
                                        ))}
                                    </select>

                                    <button onClick={() => handleRemoveFromCart(item)}>Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Total de la compra */}
                <div className="total-price">
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                    <label>Total: </label>
                    <FontAwesomeIcon icon={faDollarSign} size="lg" />
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
