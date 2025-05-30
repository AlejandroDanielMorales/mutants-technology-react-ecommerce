import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useUser} from "../../../context/UserProvider"
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faSave } from "@fortawesome/free-solid-svg-icons";
import "../EditProductModal/EditProductModal.css"; 
const API_URL = import.meta.env.VITE_API_URL; 

export default function EditUserModal({ closeModal, userId, refreshUsers }) {
    const { register, handleSubmit, setValue} = useForm();
    const {token} = useUser();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/${userId}`);
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
                await axios.put(`${API_URL}/users/${userId}`, data, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                });
            await Swal.fire({
                    icon: 'success',
                    text: 'Usuario editado',
                    confirmButtonText: 'Ok',
                  });
            refreshUsers();
            closeModal();
        } catch (error) {
            console.error("Error al editar usuario:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Editar Usuario</h3>
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
