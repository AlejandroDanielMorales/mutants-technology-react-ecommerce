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
import OrderAdmin from "./assets/pages/OrderAdmin/OrderAdmin";
import "./App.css";
import AboutUs from "./assets/pages/AboutUs/AboutUs";
import Contact from "./assets/pages/Contact/Contact";
import { useOrder } from "./assets/context/OrderContext";
import { useUser } from "./assets/context/UserProvider";
import { useEffect } from "react";

function App() {
  const { userName, userRole, fechCurrentUser} = useUser();
  const { isCartOpen } = useOrder();

  useEffect(() => {
    fechCurrentUser();
  },[]);// Fetch current user on component mount};

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route
          path="/ProductAdmin"
          element={userRole === "admin" ? <ProductAdmin /> : <Navigate to="/" />}
        />
        <Route
          path="/UserAdmin"
          element={userRole === "admin" ? <UserAdmin /> : <Navigate to="/" />}
        />
        <Route
          path="/OrderAdmin"
          element={userRole === "admin" ? <OrderAdmin /> : <Navigate to="/" />}
        />
        <Route path="/register" element={userName === "" ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {isCartOpen && (
        <ShoppingCartModal
        />
      )}

      <AddToCartModal />

      <DeleteToCartModal />

      <Footer />
    </>
  );
}

export default App;
