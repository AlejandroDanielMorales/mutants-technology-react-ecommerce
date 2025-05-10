import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-section">
                <h3><i className="fas fa-envelope"></i> Contacto</h3>
                <p>Email: <a href="mailto:MutantsTech@gmail.com">MutantsTech@gmail.com</a></p>
                <p>Teléfono: <a href="tel:+541112345678">+54 11 1234-5678</a></p>
            </div>
            <div className="footer-section">
                <h3><i className="fas fa-share-alt"></i> Redes Sociales</h3>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div className="footer-section">
                <h3><i className="fas fa-map-marker-alt"></i> Ubicación</h3>
                <p>Av. Siempre Viva 123<br />Buenos Aires, Argentina</p>
            </div>
        </footer>
    );
}
