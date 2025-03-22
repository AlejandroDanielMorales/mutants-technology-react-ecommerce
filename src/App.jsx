import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./assets/components/Header/Header";
import Footer from "./assets/components/Footer/Footer";
import Home from "./assets/pages/Home/Home";
import Register from "./assets/pages/Register/Register";
import Detail from "./assets/pages/Detail/Detail";
import Login from "./assets/pages/Login/Login";
import ProductAdmin from "./assets/pages/ProductAdmin/ProductAdmin";
import UserAdmin from "./assets/pages/UserAdmin/UserAdmin";
import ShoppingCartModal from "./assets/components/Modals/ShoppingCartModal/ShoppingCartModal";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [cartItems, setCartItems] = useState([]); 
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Recuperar usuario y carrito al cargar la app
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("userRole");
    const storedCart = localStorage.getItem("cartItems");

    if (storedUserName && storedUserRole) {
      setUserName(storedUserName);
      setUserRole(storedUserRole);
    }

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLoginSuccess = (name, role) => {
    setUserName(name);
    setUserRole(role);
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);
  };

  const handleLogout = () => {
    setUserName("");
    setUserRole("");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
  };

  const onAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <Header 
        userName={userName} 
        userRole={userRole} 
        handleLogout={handleLogout} 
        onToggleCart={toggleCart} 
        cartItemCount={cartItems.length} 
      />

      <Routes>
        <Route path="/" element={<Home onAddToCart={onAddToCart} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route
          path="/ProductAdmin"
          element={userRole === "admin" ? <ProductAdmin /> : <Navigate to="/" />}
        />
        <Route
          path="/UserAdmin"
          element={userRole === "admin" ? <UserAdmin /> : <Navigate to="/" />}
        />
        <Route path="/register" element={userName === "" ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      </Routes>

      {isCartOpen && (
        <ShoppingCartModal 
          cartItems={cartItems} 
          toggleCart={toggleCart} 
          handleRemoveFromCart={handleRemoveFromCart} 
        />
      )}

      <Footer />
    </>
  );
}

export default App;
