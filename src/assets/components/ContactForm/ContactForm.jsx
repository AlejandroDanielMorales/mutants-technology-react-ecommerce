import React from "react";
import { useForm } from "react-hook-form";
import "../RegisterForm/RegisterForm.css"; 

export default function ContactForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Mensaje enviado:", data);
        
    };

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="title-container">
                <h3>Comunicate con nosotros</h3>
            </div>

            <div className="input-group first">
                <input 
                    className="input-box" 
                    type="text" 
                    placeholder="Nombre" 
                    {...register("nombre", { required: "El nombre es obligatorio" })} 
                />
                {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
            </div>

            <div className="input-group">
                <input 
                    className="input-box" 
                    type="text" 
                    placeholder="Apellido" 
                    {...register("apellido", { required: "El apellido es obligatorio" })} 
                />
                {errors.apellido && <p className="error-message">{errors.apellido.message}</p>}
            </div>

            <div className="input-group">
                <input 
                    className="input-box" 
                    type="email" 
                    placeholder="Email" 
                    {...register("email", { 
                        required: "El email es obligatorio", 
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Ingrese un email válido"
                        } 
                    })} 
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            <div className="tx input-group">
                <textarea 
                    className="input-box"  
                    placeholder="Escriba su mensaje aquí"  
                    {...register("mensaje", { required: "El mensaje no puede estar vacío" })}
                />
                {errors.mensaje && <p className="error-message">{errors.mensaje.message}</p>}
            </div>

            <div className="is input-group">
                <input type="submit" className="card-btn cnt" value="Enviar Mensaje"/>
            </div>
        </form>
    );
};
