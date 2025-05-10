import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom"; // Asegúrate de tener acceso a navigate

const API_URL = import.meta.env.VITE_API_URL;

const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);

function OrderProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUser();
  const navigate = useNavigate(); 


  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCartItems(JSON.parse(storedCart));
    getProducts();
  }, []);
  
  

  useEffect(() => {

    const products = cartItems.map((item) => ({
      product: {
        _id: item._id,
        name: item.name,
        price: item.price,
      },
      quantity: item.quantity,
      price: item.price,
    }));

    const newTotalPrice = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setTotalPrice(newTotalPrice);
 if (user) {
    setOrderData({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      products,
      totalPrice: newTotalPrice,
      status: "pending",
    });
  } 
  }, [cartItems, user, navigate]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  
  

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  
const searchProducts = async (query) => {
  try {
    const res = await axios.get(`${API_URL}/products/search`, {
      params: { q: query },
    });
    setSearchResults(res.data);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    setSearchResults([]);
  }
};

  const onAddToCart = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    setIsAddModalOpen(true);
  };

  const confirmAddToCart = (product) => {
    if (!product.quantity) product.quantity = 1;
    if (!verifyQuantity(product.quantity)) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      let updatedItems;

      if (existingItem) {
        const newQuantity = existingItem.quantity + product.quantity;
        if (!verifyQuantity(newQuantity)) return prevItems;

        updatedItems = prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        updatedItems = [...prevItems, { ...product }];
      }

      return updatedItems;
    });
  };

  const verifyQuantity = (quantity) => {
    if (quantity > 10) {
      Swal.fire({
        icon: "warning",
        title: "Cantidad excedida",
        text: "No puedes agregar más de 10 unidades de este producto.",
        confirmButtonText: "Aceptar",
      });
      return false;
    }
    return true;
  };

  const handleRemoveFromCart = (product) => {
    setSelectedProduct(product);
    setIsRemoveModalOpen(true);
  };

  const confirmRemoveFromCart = () => {
    if (!selectedProduct) return;

    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== selectedProduct._id)
    );
    setIsRemoveModalOpen(false);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (index, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <OrderContext.Provider
      value={{
        cartItems,
        isCartOpen,
        isAddModalOpen,
        isRemoveModalOpen,
        selectedProduct,
        setIsAddModalOpen,
        setIsRemoveModalOpen,
        toggleCart,
        onAddToCart,
        confirmAddToCart,
        handleRemoveFromCart,
        confirmRemoveFromCart,
        handleQuantityChange,
        getProducts,
        products,
        totalPrice,
        orderData,
        clearCart,
        setCartItems,
        searchResults,
        searchProducts,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
