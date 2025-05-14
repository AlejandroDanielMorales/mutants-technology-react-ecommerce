import React from 'react';
import './DeleteProductModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function DeleteProductModal({ closeModal, deleteProduct, id }) {
  return (
    <div className="modal-overlay-2">
      <div className="modal-content-2">
        <h3>¿Estás seguro de que querés eliminar este producto?</h3>
        <div className="btn-container">
          <button className="btn-cancel" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimesCircle} className="btn-icon" />
            Cancelar
          </button>
          <button className="btn-confirm" onClick={() => {
            deleteProduct(id);
            closeModal();
          }}>
            <FontAwesomeIcon icon={faCheckCircle} className="btn-icon" />
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
