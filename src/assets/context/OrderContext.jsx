import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);

function OrderProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const onAddToCart = (product) => {
    setSelectedProduct(product);
    setIsAddModalOpen(true);
  };

  const confirmAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
      let updatedCart;

      if (existingItemIndex !== -1) {
        updatedCart = prevItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1 }];
      }

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
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

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
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
