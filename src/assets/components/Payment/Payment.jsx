import React, { useState, useEffect } from 'react';
import { useOrder } from '../../context/OrderContext';
import { useUser } from '../../context/UserProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { orderData ,setCartItems} = useOrder();
  const { user } = useUser();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) {
      // Si el usuario no está logueado, mostramos la alerta y redirigimos
      Swal.fire({
        icon: 'warning',
        title: 'Iniciá sesión',
        text: 'Debés estar logueado para terminar la compra.',
        confirmButtonText: 'Ir al login',
      }).then(() => {
        navigate('/login'); // Redirige al login
      });
    }
  }, []); // Solo se ejecuta si el estado del usuario cambia

  if (!user) {
    // Si no hay usuario logueado, no renderizamos nada del componente de pago
    return null;
  }

  if (!orderData || !orderData.user || !orderData.products) {
    return <p>Cargando orden...</p>;
  }

  const createOrder = async (order) => {
    const response = await axios.post(`${API_URL}/orders`, order, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  };

  const handlePayment = async () => {
    setLoading(true);
    setMessage('');
    // Limpiar el carrito en el contexto
    try {
      await createOrder(orderData);
      setMessage('✅ Orden creada con éxito');
      
      localStorage.removeItem('cartItems'); 
    } catch (err) {
      console.error(err);
      setMessage('❌ Error al crear la orden');
    } finally {
      setLoading(false);
      setCartItems([]); 
    }
  };

  const total = orderData.products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Resumen de la Orden</h2>

      <h4>Cliente</h4>
      <p><strong>Nombre:</strong> {orderData.user.name}</p>
      <p><strong>Email:</strong> {orderData.user.email}</p>

      <h4>Productos</h4>
      <ul>
        {orderData.products.map((item, index) => (
          <li key={index} style={{ marginBottom: 8 }}>
            <strong>{item.product.name}</strong> — ${item.product.price} x {item.quantity} = ${item.product.price * item.quantity}
          </li>
        ))}
      </ul>

      <p><strong>Total:</strong> ${total}</p>

      <button onClick={handlePayment} disabled={loading} style={{ marginTop: 20 }}>
        {loading ? 'Procesando...' : 'Confirmar Pago'}
      </button>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
};

export default Payment;
