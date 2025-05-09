import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../SearchBar/SearchBar';
import '../ProductsTable/ProductsTable.css';
const API_URL = import.meta.env.VITE_API_URL; 

export default function OrdersTable() {
    const [orders, setOrders] = useState([]);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const url = `${API_URL}/orders`;

    const getOrders = async () => {
        try {
            const response = await axios.get(url);
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`${url}/${id}`);
            await Swal.fire({
                    icon: 'success',
                    text: 'Orden eliminada',
                    confirmButtonText: 'Ok',
                  });
            getOrders();
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    const openConfirmModal = (orderId) => {
        setSelectedOrder(orderId);
        setIsConfirmModalOpen(true);
    };

    const openEditModal = (orderId) => {
        setSelectedOrder(orderId);
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsConfirmModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedOrder(null);
    };

    const refreshOrders = () => {
        getOrders();
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>
            <section className="table-head">
                <SearchBar />
            </section>

            <main className="main-container">
                <div className="table-container">
                    <table cellPadding="10" cellSpacing="0" className="table-products usrtbl">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Productos</th>
                                <th>Precio Total</th>
                                <th>Estado</th>
                                <th>Fecha de Creación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="name-cell">{order.user?.name}</td>
                                    <td>{order.user?.email}</td>
                                    <td>
                                        <ul style={{ paddingLeft: '10px', margin: 0 }}>
                                            {order.products.map((item, index) => (
                                                <li key={index} style={{ marginBottom: '8px' }}>
                                                    <strong>{item.product?.name}</strong><br />
                                                    Cantidad: {item.quantity}<br />
                                                    Precio unitario: ${item.price}<br />
                                                    Subtotal: ${item.price * item.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>

                                    <td>${order.totalPrice}</td>
                                    <td>{order.status}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="tool-cell">
                                        <div className="action-container">
                                            <button className="btn-edit" onClick={() => openEditModal(order._id)}>
                                                <FontAwesomeIcon icon={faEdit} size="2x" />
                                            </button>

                                            <button className="btn-delete" onClick={() => openConfirmModal(order._id)}>
                                                <FontAwesomeIcon icon={faTrash} size="2x" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
