import React from 'react';
import './ConfirmModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function ConfirmModal({ closeModal, deleteProduct, id }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
