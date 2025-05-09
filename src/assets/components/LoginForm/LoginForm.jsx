import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./LoginForm.css";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useUser();
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      
      navigate("/");
    } else {
      setLoginError(result.error);
    }
  };


  return (
    <div className="login-form-container">
      <h2 className="subtitle">Iniciar sesión</h2>
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

        <div className="input-group-lg password-wrapper">
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

      <p className="register-link">
        ¿No estás registrado? <Link to="/register">Crear cuenta</Link>
      </p>
    </div>
  );
}
