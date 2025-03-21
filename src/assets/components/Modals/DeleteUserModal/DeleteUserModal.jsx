import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../EditProductModal/EditProductModal.css"; 

export default function DeleteUserModal({ closeModal, userId, deleteUser }) {

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Eliminar Usuario</h2>
                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                <div className="btn-container">
                    <button type="button" className="btn-cancel" onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimesCircle} className="btn-icon" />
                        Cancelar
                    </button>
                    <button type="button" className="btn-delete" onClick={() => deleteUser(userId)}>
                        <FontAwesomeIcon icon={faTrash} className="btn-icon" />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
