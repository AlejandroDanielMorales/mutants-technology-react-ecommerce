import React from "react";
import "../EditProductModal/EditProductModal.css"; // Añade tu estilo aquí

const DeleteToCartModal = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
     <div className="modal-content">
      <h2>Confirmar eliminación</h2>
      <p>¿Estás seguro de que deseas eliminar {product.name} del carrito?</p>
      <div className="btn-container">
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        <button className="btn-save" onClick={() => { onConfirm(); onClose(); }}>
          Confirmar
        </button>
      </div>
    </div>
  </div>
  );
};

export default DeleteToCartModal;
