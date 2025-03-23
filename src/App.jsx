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
import AddToCartModal from "./assets/components/Modals/AddToCartModal/AddToCartModal";
import DeleteToCartModal from "./assets/components/Modals/DeleteToCartModal/DeleteToCartModal";
import "./App.css";
import AboutUs from "./assets/pages/AboutUs/AboutUs";

function App() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estados para los modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  useEffect(() => {
    // Sincronizar el carrito con localStorage cuando cambia
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
    setSelectedProduct(product);
    setIsAddModalOpen(true);
  };

  const confirmAddToCart = (product) => {
    setCartItems((prevItems) => {
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Si el producto ya existe, actualizamos solo la cantidad
        const updatedCart = prevItems.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 }; // Aumentar la cantidad en 1
          }
          return item;
        });

        // Actualizamos el carrito en el localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      }

      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      const updatedCart = [...prevItems, { ...product, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (index) => {
    setSelectedProduct(cartItems[index]);
    setIsRemoveModalOpen(true);
  };

  const confirmRemoveFromCart = () => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((_, i) => i !== cartItems.indexOf(selectedProduct));
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleQuantityChange = (index, newQuantity) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map((item, i) => {
        if (i === index) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
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
        <Route path="/detail/:id" element={<Detail onAddToCart={onAddToCart}/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
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
          handleQuantityChange={handleQuantityChange}  // Pasa la función aquí
        />
      )}

      <AddToCartModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onConfirm={confirmAddToCart} 
        product={selectedProduct} 
      />

      <DeleteToCartModal 
        isOpen={isRemoveModalOpen} 
        onClose={() => setIsRemoveModalOpen(false)} 
        onConfirm={confirmRemoveFromCart} 
        product={selectedProduct} 
      />

      <Footer />
    </>
  );
}

export default App;
