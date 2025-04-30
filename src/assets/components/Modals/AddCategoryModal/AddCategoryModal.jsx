import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../EditProductModal/EditProductModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
const API_URL = import.meta.env.VITE_API_URL

export default function AddCategoryModal({ closeModal, refreshCategories }) {
const { register, handleSubmit, reset, formState: { errors } } = useForm();

const onSubmit = async (data) => {
    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", data.image[0]); // archivo seleccionado

        await axios.post(`${API_URL}/categories`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
});

      refreshCategories(); // Actualiza la lista luego de agregar
      closeModal();        // Cierra el modal
      reset();             // Limpia el formulario
    } catch (error) {
        console.error("Error al agregar categoría:", error);
    }
};

return (
    <div className="modal-overlay">
        <div className="modal-content">
        <h2>Agregar Nueva Categoría</h2>
        <form className="form-edit" onSubmit={handleSubmit(onSubmit)}>
            <div>
            <label>Nombre:</label>
            <input
                type="text"
                {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>

            <div>
            <label>Descripción:</label>
            <input
                type="text"
                {...register("description", { required: "La descripción es obligatoria" })}
            />
            {errors.description && <p className="error-message">{errors.description.message}</p>}
            </div>

            <div>
            <label>Imagen:</label>
            <input
                type="file"
                accept="image/*"
                {...register("image", { required: "La imagen es obligatoria" })}
            />
            {errors.image && <p className="error-message">{errors.image.message}</p>}
            </div>

            <div className="btn-container">
            <button type="button" className="btn-cancel" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimesCircle} className="btn-icon" />
                Cancelar
            </button>
            <button type="submit" className="btn-save">
                <FontAwesomeIcon icon={faPlusCircle} className="btn-icon" />
                Agregar Categoría
            </button>
            </div>
        </form>
        </div>
    </div>
);
}
