import React, { useEffect, useState } from 'react';
import '../EditProductModal/EditProductModal.css';
import Swal from "sweetalert2";
import { useCategories } from "../../../context/CategoryProvider"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function EditProductModal({ closeModal, productId, refreshProducts }) {


    const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm();
    const [existingImage, setExistingImage] = useState(null);
    const {categories} = useCategories(); 

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/${productId}`);
                const data = response.data;

                Object.keys(data).forEach((key) => {
                    setValue(key, data[key]);
                });

                if (data.image) {
                    setExistingImage(data.image);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (productId) {
            fetchProduct();
        } else {
            reset({
                name: '',
                description: '',
                category: '',
                price: '',
                rating: '3',
            });
        }
    }, [productId, setValue, reset]);

    const onSubmit = async (data) => {
        try {


            if (data.image && data.image.length > 0) {
                const formData = new FormData();
                formData.append("image", data.image[0]);
                formData.append("name", data.name);
                formData.append("description", data.description);
                formData.append("category", data.category);
                formData.append("price", data.price);
                formData.append("rating", data.rating);

                await axios.put(`${API_URL}/products/${productId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            } else {

                const productData = {
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    price: data.price,
                    rating: data.rating,
                };

                await axios.put(`${API_URL}/products/${productId}`, productData);

            }
            await Swal.fire({
                    icon: 'success',
                    text: 'Producto modificado',
                    confirmButtonText: 'Ok',
                  });

            refreshProducts();
            closeModal();
        } catch (error) {
            console.error("Error al guardar el producto:", error);
            
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Editar Producto</h3>
                <form className="form-edit" onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label>Nombre:</label>
                        <input type="text" {...register("name", { required: "El nombre es obligatorio" })} />
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
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
                    </div>
                    <div>
                        <label>Precio:</label>
                        <input type="number" {...register("price", {
                            required: "El precio es obligatorio",
                            min: { value: 1, message: "Debe ser mayor a 0" }
                        })} />
                        {errors.price && <p className="error-message">{errors.price.message}</p>}
                    </div>

                    <div>
                       <label>Descripción:</label>
                       <textarea rows="4" {...register("description", { required: "La descripción es obligatoria" })}></textarea>
                       {errors.description && <p className="error-message">{errors.description.message}</p>}
                   </div>


                    <div>
                        <label>Puntaje:</label>
                        <input 
                            type="range" 
                            min="1" 
                            max="5" 
                            step="1" 
                            {...register("rating", { required: "El puntaje es obligatorio" })} 
                        />
                        <p>Puntaje actual: {watch("rating")}</p>
                    </div>

                    <div clasName="img-inputs-container">
                         <div>
                        <label>Imagen actual:</label>
                        {existingImage && (
                            <div style={{ marginBottom: "10px" }}>
                                <img src={`${API_URL}/uploads/products/${existingImage}`} alt="Imagen actual" style={{ width: "100px" }} />
                            </div>
                        )}
                        </div>
                         <div>
                        <label>Subir nueva imagen:</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image")}
                        />
                        <small>(Este campo es opcional)</small>
                        </div>
                    </div>

                    <div className="btn-container">
                        <button type="button" className="btn-cancel" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimesCircle} className="btn-icon" />
                            Cancelar
                        </button>
                        <button type="submit" className="btn-save">
                            <FontAwesomeIcon icon={faSave} className="btn-icon" />
                            Guardar Cambios
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
