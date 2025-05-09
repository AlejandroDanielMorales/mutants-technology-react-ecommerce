import React from "react";
import { useForm } from "react-hook-form";
import { useCategories } from "../../../context/CategoryProvider"; 
import axios from "axios";
import "../EditProductModal/EditProductModal.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
const API_URL = import.meta.env.VITE_API_URL


export default function AddProductModal({ closeModal, refreshProducts }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const {categories} = useCategories(); 
    
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("image", data.image[0]);
            formData.append("createdAt", new Date().toISOString());
            formData.append("description", data.description);
            formData.append("category", data.category);
            formData.append("rating", data.rating);
            formData.append("name", data.name); 
            formData.append("price", data.price);
    
            await axios.post(`${API_URL}/products`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            await Swal.fire({
                    icon: 'success',
                    text: 'Producto agregado',
                    confirmButtonText: 'Ok',
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
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
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
