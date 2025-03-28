import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./RegisterForm.css";
import { NavLink } from "react-router-dom";
import RegisterUserModal from "../Modals/RegisterUserModal/RegisterUserModal"; //  Importar el modal

export default function RegisterForm() {
        const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
        const [formData, setFormData] = useState(null); // Guarda temporalmente los datos
        const {
                register,
                handleSubmit,
                formState: { errors },
        } = useForm();

        const openConfirmModal = (data) => {
                console.log("Abriendo modal...", data); // Debug
                setFormData(data); // Guarda los datos antes de abrir el modal
                setRegisterModalOpen(true);
        };

        const closeModals = () => {
                console.log("Cerrando modal..."); // Debug
                setRegisterModalOpen(false);
        };

        const onSubmit = async () => {
                if (!formData) return; // Evita errores si el modal se cierra sin datos
                try {
                        const newUser = {
                                createdAt: new Date().toISOString(),
                                name: formData.name,
                                profilePicture: formData.profilePicture[0]?.name || "default.jpg",
                                rol: "usuario",
                                country: formData.country,
                                email: formData.email,
                                password: formData.password,
                        };

                        const response = await axios.post(
                                "https://67d4cb0dd2c7857431ee920f.mockapi.io/user",
                                newUser
                        );

                        console.log("Registro exitoso", response.data);
                        closeModals(); // Cierra el modal después del registro
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