import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faCartShopping, faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';

export default function Header({ userName, userRole, handleLogout }) {
  return (
    <header className="main-header">
      <input className="chkburger" type="checkbox" id="burger-menu" />
      <label className="nav-button" htmlFor="burger-menu">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </label>
      <Navbar userRole={userRole} />
      <div className="user-info">
        {userName && <span className="user-name">{userName}</span>}
        <div className="cart-container">
          <NavLink to="/cart" className="enlace-div">
            <FontAwesomeIcon icon={faCartShopping} size="2x" />
          </NavLink>
        </div>
        <div className="user-info">
          <NavLink to="/user" className="enlace-div">
            <FontAwesomeIcon icon={faUserAstronaut} size="2x" />
          </NavLink>
        </div>
        <button className="logout-btn" onClick={handleLogout}>

          <FontAwesomeIcon icon={faSignOut} size="2x" />
        </button>

      </div>


    </header>
  );
}