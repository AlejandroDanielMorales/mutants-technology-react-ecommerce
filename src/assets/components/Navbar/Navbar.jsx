import React from 'react'
import { NavLink } from "react-router-dom";
import './Navbar.css';

export default function Navbar({ userRole }) {
  return (
    <nav className="main-navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
          Inicio
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
          Contacto
          </NavLink>
        </li>
        {userRole === "admin" && (
          <li className="nav-item">
            <NavLink to="/ProductAdmin" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
              Adm. Productos
            </NavLink>
          </li>
        )}

        {userRole === "admin" && (
          <li className="nav-item">
            <NavLink to="/UserAdmin" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
              Adm. Usuarios
            </NavLink>
          </li>
        )}

        {userRole === "" && (
          <li className="nav-item">
            <NavLink to="/register" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
              Registrarse
            </NavLink>
          </li>
        )}
      </ul>

    </nav>
  )
}
