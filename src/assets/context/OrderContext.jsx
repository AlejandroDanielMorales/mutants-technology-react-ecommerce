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

  const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const onAddToCart = (product) => {
    setSelectedProduct(product);
    setIsAddModalOpen(true);
  };

  const confirmAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      const updatedCart = existingItem
        ? prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevItems, { ...product, quantity: 1 }];

      return updatedCart;
    });
  };

  const handleRemoveFromCart = (product) => {
    setSelectedProduct(product);
    setIsRemoveModalOpen(true);
  };

  const confirmRemoveFromCart = () => {
    if (!selectedProduct) return;

    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== selectedProduct.id)
    );
  };

  const handleQuantityChange = (index, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <OrderContext.Provider
      value={{
        cartItems,
        totalPrice,
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
