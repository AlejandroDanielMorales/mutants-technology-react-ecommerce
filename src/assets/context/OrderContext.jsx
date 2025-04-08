import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

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
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    setIsAddModalOpen(true);
  };
  const confirmAddToCart = (product) => {
    // Aseguramos que product.quantity no sea null ni undefined
    if (!product.quantity) {
      product.quantity = 1;
    }
  
    // Primero, validamos la cantidad antes de realizar cualquier otra acción
    if (!verifyQuantity(product.quantity)) {
      return; // Si la cantidad es inválida, no hacemos nada más
    }
  
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let newQuantity = product.quantity;
  
      if (existingItem) {
        // Si el producto ya existe, sumamos la nueva cantidad
        newQuantity = existingItem.quantity + product.quantity;
  
        // Verificamos si la cantidad combinada es válida
        if (!verifyQuantity(newQuantity)) {
          return prevItems; // No modificamos el carrito si la cantidad excede el límite
        }
  
        // Actualizamos el carrito con la nueva cantidad
        const updatedItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
  
        // Guardamos el carrito actualizado en localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  
        return updatedItems;
      } else {
        // Si el producto no está en el carrito, lo agregamos con la cantidad especificada
        const updatedItems = [...prevItems, { ...product }];
        
        // Guardamos el carrito actualizado en localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  
        return updatedItems;
      }
    });
  };
  
  // Función para verificar la cantidad
  const verifyQuantity = (newQuantity) => {
    if (newQuantity > 10) {
      // Si la cantidad es mayor a 10, disparamos el SweetAlert
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad excedida',
        text: 'No puedes agregar más de 10 unidades de este producto.',
        confirmButtonText: 'Aceptar'
      });
      return false; // Devuelve false si la cantidad no es válida
    }
    return true; // Si la cantidad es válida, devuelve true
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
