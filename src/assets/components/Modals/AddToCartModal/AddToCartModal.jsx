import React from "react";
import "../EditProductModal/EditProductModal.css"; 

const AddToCartModal = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
     <div className="modal-content">
      <h2>Confirmar agregar al carrito</h2>
      <p>¿Estás seguro de que deseas agregar {product.name} al carrito?</p>
      <div className="btn-container">
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        <button className="btn-save" onClick={() => { onConfirm(product); onClose(); }}>
          Confirmar
        </button>
      </div>
    </div>
  </div>

  );
};

export default AddToCartModal;
