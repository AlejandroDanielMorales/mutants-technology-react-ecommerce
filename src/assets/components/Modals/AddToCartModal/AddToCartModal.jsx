import React from "react";
import { useOrder } from "../../../context/OrderContext";
import "../EditProductModal/EditProductModal.css"; 
const AddToCartModal = () => {
  const {
    isAddModalOpen,
    selectedProduct,
    setIsAddModalOpen,
    confirmAddToCart,
  } = useOrder();

  if (!isAddModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar agregar al carrito</h3>
        <p>¿Estás seguro de que deseas agregar {selectedProduct?.name} al carrito?</p>
        <div className="btn-container">
          <button className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>
            Cancelar
          </button>
          <button 
            className="btn-save" 
            onClick={() => { 
              confirmAddToCart(selectedProduct); 
              setIsAddModalOpen(false); 
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddToCartModal;
