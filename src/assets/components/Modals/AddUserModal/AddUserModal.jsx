import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../EditProductModal/EditProductModal.css";

export default function AddUserModal({ closeModal, refreshUsers }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post("https://67d4cb0dd2c7857431ee920f.mockapi.io/user", data);
            refreshUsers();
            closeModal();
            reset();
        } catch (error) {
            console.error("Error al agregar usuario:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar Nuevo Usuario</h2>
                <form className="form-edit" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" {...register("name", { required: "El nombre es obligatorio" })} />
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" {...register("email", { required: "El email es obligatorio" })} />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: { value: 6, message: "Debe tener al menos 6 caracteres" }
                            })}
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label>País:</label>
                        <input type="text" {...register("country", { required: "El país es obligatorio" })} />
                        {errors.country && <p className="error-message">{errors.country.message}</p>}
                    </div>
                    <div>
                        <label>Rol:</label>
                        <select {...register("rol", { required: "El rol es obligatorio" })}>
                            <option value="admin">Admin</option>
                            <option value="usuario">Usuario</option>
                        </select>
                        {errors.rol && <p className="error-message">{errors.rol.message}</p>}
                    </div>

                    <div className="btn-container">
                        <button type="button" className="btn-cancel" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimesCircle} className="btn-icon" />
                            Cancelar
                        </button>
                        <button type="submit" className="btn-save">
                            <FontAwesomeIcon icon={faPlusCircle} className="btn-icon" />
                            Agregar Usuario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
