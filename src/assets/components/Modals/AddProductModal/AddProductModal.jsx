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
            const formData = new FormData();
            formData.append("image", data.image[0]); // Primer archivo
            formData.append("createdAt", new Date().toISOString());
            formData.append("description", data.description);
            formData.append("category", data.category);
            formData.append("rating", data.rating);
            formData.append("name", data.name); // Otros campos que tengas
            formData.append("price", data.price);
    
            await axios.post("http://localhost:3000/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            refreshProducts();
            closeModal();
            reset();
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
                        <label>Categoría:</label>
                        <select {...register("category", { required: "La categoría es obligatoria" })}>
                            <option value="">Seleccione una categoría</option>
                            <option value="Procesadores">Procesadores</option>
                            <option value="Memorias RAM">Memorias RAM</option>
                            <option value="Tarjetas Gráficas">Tarjetas Gráficas</option>
                            <option value="Fuentes de Poder">Fuentes de Poder</option>
                            <option value="Monitores">Monitores</option>
                        </select>
                        {errors.category && <p className="error-message">{errors.category.message}</p>}
                    </div>
                    <div>
                    <label >Puntaje</label>
                        <input 
                            type="range"
                            id="rating"
                            min="1"
                            max="5"
                            step="1"
                            {...register("rating", { required: "El puntaje es obligatorio" })}
                        />
                    </div>  
                    <div>
                        <label>Imagen (URL):</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            {...register("image", { 
                            required: "La imagen es obligatoria"
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
