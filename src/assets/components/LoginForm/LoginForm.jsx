import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Estilos para el formulario

export default function LoginForm({ onLoginSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(
        "https://67d4cb0dd2c7857431ee920f.mockapi.io/user"
      );
      const user = response.data.find(
        (user) =>
          user.email === data.email && user.password === data.password
      );
  
      if (user) {
        onLoginSuccess(user.name, user.rol);
        navigate("/"); 
      } else {
        setLoginError("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setLoginError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-form-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group-lg">
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                message: "Correo no válido",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {loginError && <p className="error">{loginError}</p>}

        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
        
      </form>
    </div>
  );
}