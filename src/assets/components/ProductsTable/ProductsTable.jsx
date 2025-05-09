import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsTable.css';
import { faEdit, faTrash ,faPlus, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../SearchBar/SearchBar';
import DeleteProductModal from '../Modals/DeleteProductModal/DeleteProductModal';
import EditProductModal from '../Modals/EditProductModal/EditProductModal';
import AddProductModal from '../Modals/AddProductModal/AddProductModal';
import AddCategoryModal from '../Modals/AddCategoryModal/AddCategoryModal';
import CategoriesTableModal from '../Modals/CategoryTableModal/CategoryTableModal';

import { useCategories } from '../../context/CategoryProvider';

const API_URL = import.meta.env.VITE_API_URL; 

export default function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
    
    const { fetchCategories } = useCategories();

    const refreshCategories = () => {
        fetchCategories();
    };
    
    const getProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/products/${id}`);
            await Swal.fire({
                    icon: 'success',
                    text: 'Producto Eliminado',
                    confirmButtonText: 'Ok',
                  });
            getProducts();

        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const openConfirmModal = (productId) => {
        setSelectedProduct(productId);
        setIsConfirmModalOpen(true);
    };

    const openEditModal = (productId) => {
        setSelectedProduct(productId);
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsConfirmModalOpen(false);
        setIsEditModalOpen(false);
        setIsAddCategoryModalOpen(false);
        setIsCategoriesModalOpen(false);
        setSelectedProduct(null);
    };

    const refreshProducts = () => {
        getProducts();
    };

    useEffect(() => {
        getProducts();
        fetchCategories(); 
    }, []);

    return (
        <div>
            <section className="table-head">
                {isAddModalOpen && <AddProductModal closeModal={() => setIsAddModalOpen(false)} refreshProducts={getProducts} />}

                <SearchBar />

                <button className="btn-add" onClick={() => setIsAddModalOpen(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Agregar Producto
                </button>

                <button className="btn-add" onClick={() => setIsAddCategoryModalOpen(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Agregar Categoría 
                </button>

                <button className="btn-add" onClick={() => setIsCategoriesModalOpen(true)}>
                    <FontAwesomeIcon icon={faList} /> Ver Categorías
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

                {isAddCategoryModalOpen && (
                    <AddCategoryModal 
                        closeModal={() => setIsAddCategoryModalOpen(false)} 
                        refreshCategories={refreshCategories} 
                    />
                )}

                {isCategoriesModalOpen && (
                    <CategoriesTableModal 
                        closeModal={() => setIsCategoriesModalOpen(false)}
                    />
                )}

                {/* Tabla de productos */}
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
                                <tr key={product._id}>
                                    <td className="cell-image">
                                        <img className="table-img" src={`${API_URL}/uploads/products/${product.image}`} alt={product.name} />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price}</td>
                                    <td className="tool-cell tcp">
                                        <div className="action-container">
                                            <button className="btn-edit" onClick={() => openEditModal(product._id)}>
                                                <FontAwesomeIcon icon={faEdit} size="2x" />
                                            </button>

                                            <button className="btn-delete" onClick={() => openConfirmModal(product._id)}>
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
