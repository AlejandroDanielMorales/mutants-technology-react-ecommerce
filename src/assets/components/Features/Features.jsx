import React from 'react';
import './Features.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import { faUsers, faTruck, faTag } from '@fortawesome/free-solid-svg-icons';

export default function Features() {
  return (
    <section className="main-features">
      <div className="feat-container">
      <NavLink to="/AboutUs" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
      <div className="card-category ft">
            <div className="icon-card-cat">
              <FontAwesomeIcon icon={faUsers} size="3x" />
            </div>
            <div className="body-card-cat">
              <h4>
                <strong>Quienes somos</strong>
              </h4>
            </div>
          </div>
      </NavLink>
       
        <a href="index.html" className="enlace-div">
          <div className="card-category ft">
            <div className="icon-card-cat">
              <FontAwesomeIcon icon={faTruck} size="3x" />
            </div>
            <div className="body-card-cat">
              <h4>
                <strong>Envios</strong>
              </h4>
            </div>
          </div>
        </a>
        <a href="index.html" className="enlace-div">
          <div className="card-category ft">
            <div className="icon-card-cat">
              <FontAwesomeIcon icon={faTag} size="3x" />
            </div>
            <div className="body-card-cat">
              <h4>
                <strong>Descuentos para socios</strong>
              </h4>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
