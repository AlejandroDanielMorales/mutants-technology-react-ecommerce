import { useEffect, useState } from "react";
import { useUser } from "../../context/UserProvider";
import axios from "axios";
import "./UserProfile.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function UserProfile() {
  const { user, isLoggedIn, token } = useUser();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching user orders:", err);
    }
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (!isLoggedIn) {
    return <div className="user-profile-container">Iniciá sesión para ver tu perfil.</div>;
  }

  return (
    <div className="profile-container">
      <div className="user-card">
        <img
          src={`${API_URL}/uploads/users/${user.profilePicture}`}
          alt="Foto de perfil"
          className="user-profile-pic"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
          }}
        />
        <div className="user-info">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.rol}</p>
        </div>
      </div>

      <div className="orders-section">
        
        <div className="filter-container"> 
        <h3>Mis compras</h3>
                  <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="order-filter"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="shipped">Envíadas</option>
          <option value="delivered">Entregadas</option>
          <option value="cancelled">Canceladas</option>
        </select>
        </div>

        {filteredOrders.length === 0 ? (
          <p>No hay órdenes para mostrar.</p>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <i className="fas fa-receipt"></i>
                  <div>
                    <p><strong>Estado:</strong> {order.status}</p>
                    <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> ${order.totalPrice}</p>
                  </div>
                </div>
                <div className="order-products">
                  <strong><i className="fas fa-box"></i> Productos:</strong>
                  <ul>
                    {order.products.map((item, idx) => (
                      <li key={idx}>
                        {item.product?.name} x{item.quantity} (${item.price} c/u)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
