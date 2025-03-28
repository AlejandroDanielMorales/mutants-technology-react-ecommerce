import React, { useEffect } from 'react';
import '../EditProductModal/EditProductModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function EditProductModal({ closeModal, productId, refreshProducts }) {
    const url = "https://67d4cb0dd2c7857431ee920f.mockapi.io/products";

    const { register, handleSubmit, setValue, reset } = useForm();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${url}/${productId}`);
                const data = response.data;

                Object.keys(data).forEach((key) => {
                    setValue(key, data[key]);
                });
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (productId) {
            fetchProduct();
        } else {
            reset({
                id: uuidv4(), 
                name: '',
                description: '',
                price: '',
                image: ''
            });
        }
    }, [productId, setValue, reset]);

    
    const onSubmit = async (data) => {
        try {
            if (productId) {

                await axios.put(`${url}/${productId}`, data);
            } else {
                // Crear un nuevo producto
                await axios.post(url, data);
            }
            refreshProducts();
            closeModal();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{productId ? 'Editar Producto' : 'Agregar Producto'}</h3>
                <form className="form-edit"onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" {...register("name", { required: true })} />
                    </div>

                    <div>
                        <label>Descripción:</label>
                        <input type="text" {...register("description", { required: true })} />
                    </div>
                    <div>
                        <label>Categoria:</label>
                        <input type="text" {...register("category", { required: true })} />
                    </div>
                    <div>
                        <label>Precio:</label>
                        <input type="number" {...register("price", { required: true })} />
                    </div>

                    <div>
                        <label>Imagen (URL):</label>
                        <input type="text" {...register("image", { required: true })} />
                    </div>

                    <div className="btn-container">
                        <button type="button" className="btn-cancel" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimesCircle} className="btn-icon" />
                            Cancelar
                        </button>
                        <button type="submit" className="btn-save">
                            <FontAwesomeIcon icon={faSave} className="btn-icon" />
                            {productId ? 'Guardar Cambios' : 'Agregar Producto'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
