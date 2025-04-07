import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsTable.css';
import { faEdit, faTrash ,faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../SearchBar/SearchBar';
import DeleteProductModal from '../Modals/DeleteProductModal/DeleteProductModal';
import EditProductModal from '../Modals/EditProductModal/EditProductModal';
import AddProductModal from '../Modals/AddProductModal/AddProductModal';

export default function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const url = "https://67d4cb0dd2c7857431ee920f.mockapi.io/products";

    // Obtener lista de productos
    const getProducts = async () => {
        try {
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Eliminar producto
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${url}/${id}`);
            getProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Abrir modal de confirmación para eliminar
    const openConfirmModal = (productId) => {
        setSelectedProduct(productId);
        setIsConfirmModalOpen(true);
    };

    // Abrir modal de edición
    const openEditModal = (productId) => {
        setSelectedProduct(productId);
        setIsEditModalOpen(true);
    };

    // Cerrar modales
    const closeModals = () => {
        setIsConfirmModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    };

    // Recargar lista después de edición
    const refreshProducts = () => {
        getProducts();
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <section className="table-head">
            

            {isAddModalOpen && <AddProductModal closeModal={() => setIsAddModalOpen(false)} refreshProducts={getProducts} />}

                <SearchBar />
                <button className="btn-add" onClick={() => setIsAddModalOpen(true)}>
                <FontAwesomeIcon icon={faPlus} /> Agregar Producto
            </button>
            </section>

            <main className="main-container">
                {/* Modales */}
                {isConfirmModalOpen && (
                    <DeleteProductModal
                        closeModal={closeModals}
                        deleteProduct={deleteProduct}
                        id={selectedProduct}
                    />
                )}
                {isEditModalOpen && (
                    <EditProductModal
                        closeModal={closeModals}
                        productId={selectedProduct}
                        refreshProducts={refreshProducts}
                    />
                )}

                {/* Tabla */}
                
                <div className="table-container">
                
                    <table cellPadding="10" cellSpacing="0" className="table-products usrtbl">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="cell-image">
                                        <img className="table-img" src={product.image} alt={product.name} />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price}</td>
                                    <td className="tool-cell tcp">
                                    <div className="action-container">
                                        <button className="btn-edit" onClick={() => openEditModal(product.id)}>
                                            <FontAwesomeIcon icon={faEdit} size="2x" />
                                        </button>

                                        <button className="btn-delete" onClick={() => openConfirmModal(product.id)}>
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
