import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut, faCartShopping, faBars, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserProvider";


export default function Header() {
  const { userName, userRole, handleLogout } = useUser();
  const { toggleCart,cartItems } = useOrder();

  const context = useOrder()
  console.log(context);

  return (
    <header className="main-header">
      <input className="chkburger" type="checkbox" id="burger-menu" />
      <label className="nav-button" htmlFor="burger-menu">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </label>
      
      <Navbar userRole={userRole} />

      <div className="user-info">
        {userName && <span className="user-name">{userName}</span>}

        <div className="cart-container" onClick={toggleCart}>
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </div>

        <div className="user-icon">
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
