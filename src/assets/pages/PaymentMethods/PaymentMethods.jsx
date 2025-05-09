import React, { useEffect } from 'react';
import Payment from '../../components/Payment/Payment';
import Swal from 'sweetalert2';
import { useUser } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

export default function PaymentMethods() {
  const { token ,user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [token, user, navigate]);

  const checkAuth = async () => {
    if (user !== undefined && (!token || token === '')) {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Iniciá sesión',
        text: 'Debés estar logueado para terminar la compra.',
        confirmButtonText: 'Ir al login',
      });

      if (result.isConfirmed) {
        navigate('/login');
      }
    }
  };

  if (user === undefined) return <Spinner />;

  return (
    <main className="container">
      <h1>Métodos de Pago</h1>
      {user && user.name && <Payment />}
    </main>
  );
}
