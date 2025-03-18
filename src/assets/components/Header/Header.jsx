import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faCartShopping , faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="main-header">
      <input className="chkburger" type="checkbox" id="burger-menu" />
      <label className="nav-button" htmlFor="burger-menu">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </label>
      <Navbar />
      <div className="user-info">
        <div className="cart-container">
          <NavLink to="/cart" className="enlace-div">
            <FontAwesomeIcon icon={faCartShopping} size="2x" />
          </NavLink>
        </div>
        <div className="user-info">

          <NavLink to="/user" className="enlace-div">
            {/* <img src="/assets/images/profile.jfif" alt="profile-picture" /> */}
            <FontAwesomeIcon icon={faUserAstronaut} size="2x" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
