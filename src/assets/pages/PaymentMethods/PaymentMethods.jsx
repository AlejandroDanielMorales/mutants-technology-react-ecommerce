import React, { useEffect, useState } from 'react';
import Payment from '../../components/Payment/Payment';
import Swal from 'sweetalert2';
import { useUser } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethods() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Mostramos la alerta solo si user === null
    if (user === null) {
      setShowAlert(true);
    }
  }, []);

  useEffect(() => {
    if (showAlert) {
      Swal.fire({
        icon: 'warning',
        title: 'Iniciá sesión',
        text: 'Debés estar logueado para terminar la compra.',
        confirmButtonText: 'Ir al login',
      }).then(() => {
        navigate('/login');
      });
    }
  }, [showAlert]);

  // Mostramos un loader si user aún no se cargó
  if (user === undefined) return <p>Cargando...</p>;

  return (
    <main className="container">
      <h1>Métodos de Pago</h1>
      {user && user.name && <Payment />}
    </main>
  );
}
