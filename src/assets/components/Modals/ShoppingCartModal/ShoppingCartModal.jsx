import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShoppingCart, 
  faDollarSign, 
  faChevronLeft, 
  faChevronRight, 
  faTrash 
} from "@fortawesome/free-solid-svg-icons";
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

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleCart();
    }
  };

  return (
    <div className="cart-modal-overlay" onClick={closeModal}>
      <div className="cart-modal">
        <div className="cart-modal-header">
          <h2 className="cart-title">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            Tu compra
          </h2>
          <button className="cart-close-btn" onClick={toggleCart}>
            &times;
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <p>Your cart is empty</p>
            <button className="cart-continue-btn" onClick={toggleCart}>
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-container">
              <div className="cart-items-header">
                <div className="cart-header-product">Product</div>
                <div className="cart-header-price">Price</div>
                <div className="cart-header-quantity">Quantity</div>
                <div className="cart-header-subtotal">Subtotal</div>
                <div className="cart-header-remove"></div>
              </div>
              
              <div className="cart-items-list">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="cart-item">
                    <div className="cart-item-product">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="cart-item-image" 
                      />
                      <span className="cart-item-name">{item.name}</span>
                    </div>
                    
                    <div className="cart-item-price">
                      <FontAwesomeIcon className="price-icon" icon={faDollarSign} />
                      {item.price}
                    </div>
                    
                    <div className="cart-item-quantity">
                      <button 
                        className="quantity-btn decrement"
                        onClick={() => handleQuantityChange(index, Math.max(1, item.quantity - 1))} 
                        disabled={item.quantity === 1}
                        aria-label="Decrease quantity"  
                      >
                        <FontAwesomeIcon icon={faChevronLeft} color='var(--color-principal)!important' />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        className="quantity-btn increment"
                        onClick={() => handleQuantityChange(index, Math.min(10, item.quantity + 1))} 
                        disabled={item.quantity === 10}
                        aria-label="Increase quantity"
                      >
                        <FontAwesomeIcon icon={faChevronRight} color='var(--color-principal)!important'/>
                      </button>
                    </div>
                    
                    <div className="cart-item-price">
                      <FontAwesomeIcon className="price-icon" icon={faDollarSign} />
                      {(item.price * item.quantity)}
                    </div>
                    
                    <div className="cart-item-remove">
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveFromCart(item)}
                        aria-label="Remove item"
                      >
                        <FontAwesomeIcon icon={faTrash}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-amount">
                  <FontAwesomeIcon className="price-icon"icon={faDollarSign} />
                  {totalPrice}
                </span>
              </div>
              <button className="cart-checkout-btn">
                Terminar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}