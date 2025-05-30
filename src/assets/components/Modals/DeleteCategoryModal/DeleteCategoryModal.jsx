import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCategories } from '../../../context/CategoryProvider';
import "../EditProductModal/EditProductModal.css"; 

export default function DeleteCategoryModal({ closeModal, categoryId }) {
    const { deleteCategory } = useCategories();
    return (
        <div className="modal-overlay-2">
            <div className="modal-content">
                <h3>Eliminar Categoria</h3>
                <p>¿Estás seguro de que deseas eliminar esta categoria?</p>
                <div className="btn-container">
                    <button type="button" className="btn-cancel" onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimesCircle} className="btn-icon" />
                        Cancelar
                    </button>
                    <button type="button" className="btn-delete" onClick={() => deleteCategory(categoryId,closeModal)}>
                        <FontAwesomeIcon icon={faTrash} className="btn-icon" />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
