import { useEffect, useState } from "react";
import { useUser } from "../../context/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import axios from "axios";
import "./UserProfile.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function UserProfile() {
  const { user, isLoggedIn, token , fechCurrentUser } = useUser();
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
    const handleProfilePicChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const imagePreview = URL.createObjectURL(file); // crea URL temporal para mostrar la miniatura

  const result = await Swal.fire({
    title: "¿Actualizar foto de perfil?",
    html: `
      <p>Vas a actualizar tu foto de perfil con esta imagen:</p>
      <img src="${imagePreview}" alt="Preview" style="max-width: 100px; border-radius: 50%; margin-top: 10px;" />
    `,
    showCancelButton: true,
    confirmButtonText: "Sí, actualizar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });

  if (!result.isConfirmed) {
    return;
  }

  const formData = new FormData();
  formData.append("profilePicture", file);

  try {
    const res = await axios.put(`${API_URL}/users/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    await Swal.fire({
      icon: "success",
      text: "Foto actualizada correctamente",
      confirmButtonText: "Ok",
    });

    fechCurrentUser();
    fetchOrders();
  } catch (error) {
    console.error("Error al actualizar foto:", error);
    await Swal.fire({
      icon: "error",
      text: "Ocurrió un error al actualizar la foto",
    });
  }
};

  
  const handleEditInfo = () => {
    // Podés abrir un modal, redireccionar o mostrar campos editables
    alert("Funcionalidad de edición de información pendiente");
  };
  
  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (!isLoggedIn) {
    return <div className="user-profile-container">Iniciá sesión para ver tu perfil.</div>;
  }

  return (
    <div className="profile-container">
      <div className="user-card">
  <div className="profile-pic-container">
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
      
         <label htmlFor="profilePicInput" className="edit-photo-btn">
           <FontAwesomeIcon icon={faCamera} />
         </label>
         <input
           type="file"
           id="profilePicInput"
           style={{ display: "none" }}
           onChange={handleProfilePicChange}
         />
       </div>
      
       <div className="user-info">
         <h2>{user.name}</h2>
         <p><strong>Email:</strong> {user.email}</p>
         <p><strong>Rol:</strong> {user.rol}</p>
         <button className="edit-info-btn" onClick={handleEditInfo}>
           Editar información
         </button>
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
