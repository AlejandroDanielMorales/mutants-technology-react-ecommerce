import React from "react";
import "../RegisterForm/RegisterForm.css"; 

export default function ContactForm() {
    
  return (
   
            <form className="form" action="index.html" method="get">
                <div className="tittle-conteiner">
                    <h3>Cominicate con nosotros</h3>
                </div>
                <div className="input-group first">
                    <input className="input-box" type="text" name="nombre"placeholder="Nombre" required/>
                </div>
                <div className="input-group">
                    <input className="input-box" type="text" name="apellido" placeholder="Apellido" required/>
                </div>
               
                 <div className="input-group">
                    <input className="input-box" type="email" placeholder="Email" required/>
                </div>
                <div className="tx input-group">
                    <textarea className="input-box"  placeholder="Escriba su mensaje aquí"  required></textarea>
                </div>
             
                <div className="is input-group">
                   <input type="submit" className="card-btn cnt" value="Enviar Mensaje"/>
                </div>
            </form>
  );
};