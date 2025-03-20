import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./assets/components/Header/Header";
import Footer from "./assets/components/Footer/Footer";
import Home from "./assets/pages/Home/Home";
import Register from "./assets/pages/Register/Register";
import Detail from "./assets/pages/Detail/Detail";
import Login from "./assets/pages/Login/Login";
import "./App.css";
import ProductAdmin from "./assets/pages/ProductAdmin/ProductAdmin";

function App() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  // Recuperar el estado del usuario desde localStorage al cargar la aplicación
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("userRole");

    if (storedUserName && storedUserRole) {
      setUserName(storedUserName);
      setUserRole(storedUserRole);
    }
  }, []);

  const handleLoginSuccess = (name, role) => {
    setUserName(name);
    setUserRole(role);

    // Guardar el estado del usuario en localStorage
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);
  };

  const handleLogout = () => {
    setUserName("");
    setUserRole("");

    // Eliminar el estado del usuario de localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
  };

  return (
    <>
      <Header userName={userName} userRole={userRole} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route
          path="/ProductAdmin"
          element={
            userRole === "admin" ? ( // Solo permite acceso si es admin
              <ProductAdmin />
            ) : (
              <Navigate to="/" /> // Redirige a Home si no tiene permisos
            )
          }
        />
        <Route path="/register" element={userName === "" ? (<Register />) : (
              <Navigate to="/" /> 
            )} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;