import React from 'react'
import './RegisterForm.css'

export default function RegisterForm() {
return (
    <main className="cards-container">
             <section className="tittle-conteiner">
                    <h2>
                            Registrate 
                    </h2>
                    <h3>
                            Las mejores ofertas te esperan
                    </h3>
            </section>
            
    
    <div className="back-form reg">
    <form className="form" action="index.html" method="get">
            <div className="profile-picture">
                    <img src="assets/images/profile.jfif" alt="profile-picture"/>
            </div>
            <div className="input-group">
                    <input 
                    className="input-box" 
                    name="-complete name" 
                    type="text"
                    placeholder="Nombre completo" 
                    required/>
            </div>
            <div className=" input-group">
                    <input 
                    className="input-box" 
                    name="email" 
                    type="email"  
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    placeholder="Email" 
                    required/>
            </div>
            <div className="input-group">
                    <input 
                    className="input-box"
                    name="password" 
                    type="password" 
                    maxlength="50" 
                    pattern="(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+" 
                    title="Debe contener al menos una letra mayúscula, un número y un carácter especial"                
                    placeholder="Contraseña" 
                    required/>
            </div>
            <div className="input-group">
                    <input 
                    className="input-box" 
                    name="repeatpassword" 
                    type="password" 
                    maxlength="50" 
                    pattern="(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+" 
                    title="Debe contener al menos una letra mayúscula, un número y un carácter especial"              
                    placeholder="Repetir contraseña" 
                    required/>
            </div>
            <div className="input-group">
                    <input 
                    className="input-box" 
                    name="dateofbirth" 
                    type="date" 
                    laceholder="Fecha de Nacimiento" 
                    min="1920-12-31" 
                    max=" 2010-01-01"
                    required/>
            </div>
            <div className="input-group">
                    <input 
                    className="input-box" 
                    name="country"
                    type="text" 
                    placeholder="País" 
                    required/>
            </div>
            <div className="input-group">
                    <input 
                    className="input-box"
                    type="file" 
                    placeholder="Agregar foto" 
                    required/>
            </div>     
            <div className="is reg input-group">
                    <input 
                    type="submit" 
                    className="card-btn" 
                    value="Registrarse"/>
            </div>
    </form>
</div>
</main>
)
}
