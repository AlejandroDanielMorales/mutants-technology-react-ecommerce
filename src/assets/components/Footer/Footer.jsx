import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhoneAlt,
  faClock,
  faMapMarkerAlt,
  faMap,
  faEnvelopeOpenText,
  faPaperPlane,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-section">
        <h3><FontAwesomeIcon icon={faEnvelope} /> Contacto</h3>
        <p><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:MutantsTech@gmail.com">MutantsTech@gmail.com</a></p>
        <p><FontAwesomeIcon icon={faPhoneAlt} /> <a href="tel:+541112345678">+54 11 1234-5678</a></p>
        <p><FontAwesomeIcon icon={faClock} /> Lunes a Sábados: 8:00 - 18:00</p>
      </div>

      <div className="footer-section">
        <h3><FontAwesomeIcon icon={faShareAlt} /> Redes Sociales</h3>
        <div className="social-icons">
          <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
        </div>
      </div>

      <div className="footer-section">
        <h3><FontAwesomeIcon icon={faMapMarkerAlt} /> Ubicación</h3>
        <p>Av. Siempre Viva 123<br />Buenos Aires, Argentina</p>
        <a
          className="map-link"
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faMap} /> Ver en el mapa
        </a>
      </div>

      <div className="footer-section">
        <h3><FontAwesomeIcon icon={faEnvelopeOpenText} /> Newsletter</h3>
        <p>Suscribite para recibir novedades:</p>
        <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Tu correo electrónico" required />
          <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
        </form>
      </div>
    </footer>
  );
}
