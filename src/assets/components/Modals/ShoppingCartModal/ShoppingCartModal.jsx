import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import './ShoppingCartModal.css';

export default function ShoppingCartModal({ cartItems, toggleCart, handleRemoveFromCart, handleQuantityChange }) {
    const [quantities, setQuantities] = useState([]);

    // Cargar las cantidades del carrito al cargar el componente y cada vez que se abre el modal
    useEffect(() => {
        // Si cartItems se actualiza, actualizamos las cantidades en el estado
        setQuantities(cartItems.map(item => item.quantity || 1));
    }, [cartItems]);

    // Calcular el total de la compra
    const totalPrice = cartItems.reduce((total, item, index) => {
        return total + item.price * quantities[index];
    }, 0);

    // Función para cerrar el modal y actualizar localStorage
    const closeModalAndUpdateStorage = () => {
        // Guardar los cambios de cantidades en el localStorage antes de cerrar el modal
        const updatedCartItems = cartItems.map((item, index) => ({
            ...item,
            quantity: quantities[index]
        }));
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

        // Llamar a la función que cierra el modal
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

                                    {/* Select para cantidad */}
                                    <label htmlFor={`quantity-${index}`}>Cantidad:</label>
                                    <select
                                        id={`quantity-${index}`}
                                        value={quantities[index]}
                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                    >
                                        {[...Array(10).keys()].map((n) => (
                                            <option key={n + 1} value={n + 1}>{n + 1}</option>
                                        ))}
                                    </select>

                                    <button onClick={() => handleRemoveFromCart(index)}>Eliminar</button>
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
