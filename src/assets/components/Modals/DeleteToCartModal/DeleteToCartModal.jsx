import React from "react";
import "../EditProductModal/EditProductModal.css";
import { useOrder } from "../../../context/OrderContext";

const DeleteToCartModal = () => {
  const {
    isRemoveModalOpen,
    selectedProduct,
    setIsRemoveModalOpen,
    confirmRemoveFromCart
  } = useOrder();

  if (!isRemoveModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmar eliminación</h2>
        {/* Mostrar solo el nombre del producto */}
        <p>¿Estás seguro de que deseas eliminar {selectedProduct?.name} del carrito?</p>
        <div className="btn-container">
          {/* Corregido: pasar función en lugar de ejecutarla directamente */}
          <button 
            className="btn-cancel" 
            onClick={() => setIsRemoveModalOpen(false)}
          >
            Cancelar
          </button>
          <button 
            className="btn-save" 
            onClick={() => { 
              confirmRemoveFromCart(selectedProduct);
              setIsRemoveModalOpen(false); 
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteToCartModal;