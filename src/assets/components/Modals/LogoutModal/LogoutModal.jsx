import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "../EditProductModal/EditProductModal.css"; // Asegúrate de crear este archivo CSS

export default function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content logout-modal">
        <h2>Cerrar sesión</h2>
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
        
        <div className="btn-container">
          <button type="button" className="btn-cancel" onClick={onClose}>
            <FontAwesomeIcon icon={faTimesCircle} className="btn-icon" />
            Cancelar
          </button>
          <button 
            type="button" 
            className="btn-danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            <FontAwesomeIcon icon={faSignOut} className="btn-icon" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}