import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../EditProductModal/EditProductModal.css"; // Reutiliza los estilos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function AddProductModal({ closeModal, refreshProducts }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            data.createdAt = new Date().toISOString(); // Agrega la fecha de creación
            await axios.post("https://67d4cb0dd2c7857431ee920f.mockapi.io/products", data);
            refreshProducts(); // Para actualizar la lista de productos
            closeModal();
            reset(); // Resetea el formulario
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar Nuevo Producto</h2>
                <form className="form-edit" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" {...register("name", { required: "El nombre es obligatorio" })} />
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label>Descripción:</label>
                        <input type="text" {...register("description", { required: "La descripción es obligatoria" })} />
                        {errors.description && <p className="error-message">{errors.description.message}</p>}
                    </div>

                    <div>
                        <label>Precio:</label>
                        <input 
                            type="number" 
                            {...register("price", { 
                                required: "El precio es obligatorio", 
                                min: { value: 1, message: "El precio debe ser mayor a 0" }
                            })} 
                        />
                        {errors.price && <p className="error-message">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label>Imagen (URL):</label>
                        <input 
                            type="text" 
                            {...register("image", { 
                                required: "La URL de la imagen es obligatoria",
                                pattern: {
                                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                                    message: "Ingrese una URL válida"
                                }
                            })} 
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
                            Agregar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
