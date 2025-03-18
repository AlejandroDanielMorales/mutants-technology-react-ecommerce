import React from 'react'
import './Footer.css'
export default function Footer() {
return (
    <footer className="main-footer">
        <div className="footer-section">
            <h3>Contacto</h3>
            <p>Email: contacto@corralonUTN.com</p>
            <p>Teléfono: +54 11 1234-5678</p>
        </div>
        <div className="footer-section">
            <h3>Redes Sociales</h3>
            <div className="social-icons">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
        </div>
        <div className="footer-section">
            <h3>Ubicación</h3>
            <p>Av. Siempre Viva 123, Buenos Aires, Argentina</p>
        </div>
    </footer>
)
}
