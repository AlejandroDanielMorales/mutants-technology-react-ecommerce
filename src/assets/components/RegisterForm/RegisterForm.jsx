import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import { NavLink } from "react-router-dom";
import RegisterUserModal from "../Modals/RegisterUserModal/RegisterUserModal"; 
const API_URL = import.meta.env.VITE_API_URL; 

export default function RegisterForm() {
        const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
        const [formData, setFormData] = useState(null); 
        const navigate = useNavigate();
        const {
                register,
                handleSubmit,reset,
                formState: { errors },
        } = useForm();


        const openConfirmModal = (data) => {
                setFormData(data); 
                setRegisterModalOpen(true);
        };

        const closeModals = () => {
                setRegisterModalOpen(false);
        };
        const onSubmit = async () => {
                if (!formData) return;
                try {
                        const dataToSend = new FormData();
                        dataToSend.append("name", formData.name);
                        dataToSend.append("rol", "user");
                        dataToSend.append("email", formData.email);
                        dataToSend.append("password", formData.password);
                        dataToSend.append("country", formData.country);
                        if (formData.profilePicture && formData.profilePicture[0]) {
                        dataToSend.append("profilePicture", formData.profilePicture[0]);
                        }
                        const response = await axios.post(
                                `${API_URL}/users`,
                                dataToSend,  
                                {
                                        headers: {
                                        "Content-Type": "multipart/form-data",
                                        },
                                }
                        );
                        await Swal.fire({
                           icon: 'success',
                           text: 'Registro exitoso',
                           confirmButtonText: 'Ok',
                         });
                        reset();
                        closeModals();
                        navigate("/Login");
                } catch (error) {
                        console.error("Error en el registro", error);
                }
                }; 
        return (
                
                <>
                        {isRegisterModalOpen && (
                                <RegisterUserModal closeModal={closeModals} onConfirm={onSubmit} />
                        )}
                        

                        <div className="back-form">
                        
                                <form className="form" onSubmit={handleSubmit(openConfirmModal)}>
                                <div className="tittle-conteiner">
                                <h4>Registrate</h4>
                                <h5>Las mejores ofertas te esperan</h5>
                        </div>
                                        <div className="input-group first">
                                                <input
                                                        className="input-box"
                                                        {...register("name", { required: "El nombre es obligatorio" })}
                                                        type="text"
                                                        placeholder="Nombre completo"
                                                />
                                                {errors.name && <p className="error">{errors.name.message}</p>}
                                        </div>

                                        <div className="input-group">
                                                <input
                                                        className="input-box"
                                                        {...register("email", {
                                                                required: "El email es obligatorio",
                                                                pattern: {
                                                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                                                                        message: "Email no válido",
                                                                },
                                                        })}
                                                        type="email"
                                                        placeholder="Email"
                                                />
                                                {errors.email && <p className="error">{errors.email.message}</p>}
                                        </div>

                                        <div className="input-group">
                                                <input
                                                        className="input-box"
                                                        {...register("password", {
                                                                required: "La contraseña es obligatoria",
                                                                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                                                        })}
                                                        type="password"
                                                        placeholder="Contraseña"
                                                />
                                                {errors.password && <p className="error">{errors.password.message}</p>}
                                        </div>

                                        <div className="input-group">
                                                <input
                                                        className="input-box"
                                                        {...register("country", { required: "Campo obligatorio" })}
                                                        type="text"
                                                        placeholder="País"
                                                />
                                                {errors.country && <p className="error">{errors.country.message}</p>}
                                        </div>

                                        <div className="input-group">
                                                <input
                                                        className="input-box"
                                                        {...register("profilePicture")}
                                                        type="file"
                                                />
                                        </div>

                                        <div className=" input-group">
                                                <button type="submit" className="card-btn">Registrarse</button>
                                                <NavLink to="/login" className="login-link">
                                                Ya tengo una cuenta
                                        </NavLink>
                                        </div>
                                        
                                </form>
                        </div>
                </>
        );
}