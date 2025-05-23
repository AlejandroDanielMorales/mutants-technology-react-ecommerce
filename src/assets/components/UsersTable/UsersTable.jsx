import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ProductsTable/ProductsTable.css';
import Swal from "sweetalert2";
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../SearchBar/SearchBar';
import DeleteUserModal from '../Modals/DeleteUserModal/DeleteUserModal';
import EditUserModal from '..//Modals/EditUserModal/EditUserModal';
import AddUserModal from '../Modals/AddUserModal/AddUserModal';
const API_URL = import.meta.env.VITE_API_URL; 

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const url = `${API_URL}/users`;

    const getUsers = async () => {
        try {
            const response = await axios.get(url);
            const filteredUsers = response.data.filter(user => user.rol.toLowerCase() === "user");
            setUsers(filteredUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Eliminar usuario
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${url}/${id}`);

            await Swal.fire({
            icon: 'success',
            text: 'Usuario Eliminado',
            confirmButtonText: 'Ok',
          });
            closeModals();
            getUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const openConfirmModal = (userId) => {
        setSelectedUser(userId);
        setIsConfirmModalOpen(true);
    };

    const openEditModal = (userId) => {
        setSelectedUser(userId);
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsConfirmModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="table-container">
            <section className="table-head">
               
                {isAddModalOpen && <AddUserModal closeModal={() => setIsAddModalOpen(false)} refreshUsers={getUsers} />}
                <SearchBar />
                <button className="btn-add" onClick={() => setIsAddModalOpen(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Agregar Usuario
                </button>
            </section>

            <main className="main-container">
                {/* Modales */}
                {isConfirmModalOpen && (
                    <DeleteUserModal
                        closeModal={closeModals}
                        deleteUser={deleteUser}
                        userId={selectedUser}
                        
                    />
                )}
                {isEditModalOpen && (
                    <EditUserModal
                        closeModal={closeModals}
                        userId={selectedUser}
                        refreshUsers={getUsers}
                    />
                )}

                {/* Tabla */}
                <div className="table-container">
                    <table cellPadding="10" cellSpacing="0" className="table-users usrtbl">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>País</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="cell-image">
                                        <img className="table-img" src={`${API_URL}/uploads/users/${user.profilePicture}`} alt={user.name} />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.country}</td>
                                    <td className="tool-cell">
                                        <div className="action-container">
                                        <button className="btn-edit" onClick={() => openEditModal(user._id)}>
                                            <FontAwesomeIcon icon={faEdit} size="2x" />
                                        </button>

                                        <button className="btn-delete" onClick={() => openConfirmModal(user._id)}>
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
