import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faSave } from "@fortawesome/free-solid-svg-icons";
import "../EditProductModal/EditProductModal.css"; 

export default function EditUserModal({ closeModal, userId, refreshUsers }) {
    const { register, handleSubmit, setValue} = useForm();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://67d4cb0dd2c7857431ee920f.mockapi.io/user/${userId}`);
                const data = response.data;
                Object.keys(data).forEach((key) => setValue(key, data[key]));
            } catch (error) {
                console.error("Error al obtener usuario:", error);
            }
        };

        if (userId) fetchUser();
    }, [userId, setValue]);

    const onSubmit = async (data) => {
        try {
            await axios.put(`https://67d4cb0dd2c7857431ee920f.mockapi.io/user/${userId}`, data);
            refreshUsers();
            closeModal();
        } catch (error) {
            console.error("Error al editar usuario:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Usuario</h2>
                <form className="form-edit" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" {...register("name", { required: true })} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" {...register("email", { required: true })} />
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
