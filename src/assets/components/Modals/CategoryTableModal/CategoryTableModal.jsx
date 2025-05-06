import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useCategories } from '../../../context/CategoryProvider';
import EditCategoryModal from '../EditCategoryModal/EditCategoryModal';
import './CategoryTableModal.css';

export default function CategoryTableModal({ closeModal }) {
    const { categories, fetchCategories } = useCategories();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const openEditModal = (id) => {
        setSelectedCategoryId(id);
        setIsEditModalOpen(true);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content categories-modal">
                <button className="modal-close" onClick={closeModal}>
                    <FontAwesomeIcon icon={faClose} />
                </button>

                <h2>Categorías</h2>

                <table className="table-categories">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat._id}>
                                <td>{cat.name}</td>
                                <td>{cat.description}</td>
                                <td>
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/uploads/categories/${cat.image}`}
                                        alt={cat.name}
                                        className="category-img-preview"
                                    />
                                </td>
                                <td>
                                    <button className="btn-edit" onClick={() => openEditModal(cat._id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isEditModalOpen && (
                    <EditCategoryModal
                        closeModal={() => setIsEditModalOpen(false)}
                        categoryId={selectedCategoryId}
                    />
                )}
            </div>
        </div>
    );
}
