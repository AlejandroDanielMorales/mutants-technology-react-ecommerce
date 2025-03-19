import React from "react";
import "../DeleteProductModal/DeleteProductModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function RegisterUserModal({ closeModal, onConfirm }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>¿Estás seguro de que querés registrarte?</h3>
                <div className="btn-container">
                    <button className="btn-cancel" onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimesCircle} className="btn-icon" />
                        Cancelar
                    </button>
                    <button className="btn-confirm" onClick={onConfirm}>
                        <FontAwesomeIcon icon={faCheckCircle} className="btn-icon" />
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}