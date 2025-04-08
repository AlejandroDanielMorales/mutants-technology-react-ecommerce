import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faChevronRight, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import Swal from "sweetalert2";
import "./Detail.css";

export default function Detail() {
    const { onAddToCart, isAddModalOpen, selectedProduct, setIsAddModalOpen, confirmAddToCart } = useOrder();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`https://67d4cb0dd2c7857431ee920f.mockapi.io/products/${id}`)
            .then(response => {
                setProduct(response.data);
                
                // Buscar el producto en el carrito
                const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
                const existingItem = cart.find(item => item.id === response.data.id);
                
                // Si el producto está en el carrito, cargar la cantidad guardada
                if (existingItem) {
                    setQuantity(existingItem.quantity);
                }
            })
            .catch(error => console.error("Error al obtener el producto:", error));
    }, [id]);

    const handleDecrease = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handleIncrease = () => {
        setQuantity(prev => Math.min(10, prev + 1));
    };

    const handleAddToCart = () => {
        if (product) {
            // Verificamos si la cantidad excede el límite
            if (quantity > 10) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Cantidad excedida',
                    text: 'No puedes agregar más de 10 unidades de este producto.',
                    confirmButtonText: 'Aceptar'
                });
                return; // Si la cantidad excede 10, no hacemos nada más
            }

            const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
            const existingItemIndex = cart.findIndex(item => item.id === product.id);
            let newQuantity = quantity;
    
            if (existingItemIndex !== -1) {
                newQuantity = cart[existingItemIndex].quantity + quantity;
    
                // Verificamos si la cantidad combinada excede el límite
                if (newQuantity > 10) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cantidad excedida',
                        text: 'No puedes agregar más de 10 unidades de este producto.',
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }
    
                cart[existingItemIndex].quantity = newQuantity;
            } else {
                cart.push({ ...product, quantity });
            }
    
            localStorage.setItem("cartItems", JSON.stringify(cart));

            onAddToCart({ ...product, quantity });
        }
    };
    
    const handleConfirmAdd = () => {
        // Aseguramos que la cantidad y el producto sean los correctos al confirmar
        if (!verifyQuantity(quantity)) return;

        confirmAddToCart({ ...selectedProduct, quantity });
        setIsAddModalOpen(false);
        setQuantity(1);
    };

    // Función para verificar la cantidad
    const verifyQuantity = (newQuantity) => {
        if (newQuantity > 10) {
            Swal.fire({
                icon: 'warning',
                title: 'Cantidad excedida',
                text: 'No puedes agregar más de 10 unidades de este producto.',
                confirmButtonText: 'Aceptar'
            });
            return false; // No permite continuar si la cantidad excede 10
        }
        return true; // La cantidad es válida
    };

    if (!product) return <p>Cargando...</p>;

    return (
        <main className="container cards-container-2">
            <h3 className="card-title-2"><em>{product.name}</em></h3>
            <div className="card-background-3">
                <article className="card-detail-2">
                    <img className="card-img-2" src={product.image} alt={product.name} />
                    <div className="card-body-2">
                        <h4><em>Especificaciones Técnicas</em></h4>
                        <h4><em>Descripción</em></h4>
                        <p className="card-p">{product.description}</p>
                        <h4><em>Precio</em></h4>
                        <p className="card-p">${product.price}</p>
                        
                        {/* Selector de cantidad */}
                        <div style={{ margin: "15px 0" }}>
                            <h4><em>Cantidad</em></h4>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
                                <button 
                                    className="card-btn-3"
                                    onClick={handleDecrease}
                                    disabled={quantity === 1}
                                    style={{ width: "30px", height: "30px", borderRadius: "50%", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                                >
                                    <FontAwesomeIcon icon={faMinus} color="#2E3239" />
                                </button>
                                <span className="card-p" style={{ minWidth: "30px", textAlign: "center" }}>
                                    {quantity}
                                </span>
                                <button 
                                    className="card-btn-3"
                                    onClick={handleIncrease}
                                    disabled={quantity === 10}
                                    style={{ width: "30px", height: "30px", borderRadius: "50%", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                                >
                                    <FontAwesomeIcon icon={faChevronRight} color="#2E3239" />
                                </button>
                            </div>
                        </div>

                        <div className="backdiv">
                            <button onClick={() => window.history.back()} className="card-btn-3"
                                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                >
                                <FontAwesomeIcon className="btn-icon" icon={faPlus} size="1x" color="var(--color-principal)!important;"/>
                                Volver
                            </button>
                            <button 
                                className="card-btn-3" 
                                onClick={handleAddToCart}
                                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} className="btn-icon" size="1x" color="#2E3239" />
                                Agregar al carrito ({quantity})
                            </button> 
                        </div>
                    </div>
                </article>
            </div>

            {/* Modal de confirmación */}
            {isAddModalOpen && selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirmar agregar al carrito</h2>
                        <p>
                            ¿Estás seguro de que deseas agregar {quantity} {quantity > 1 ? 'unidades' : 'unidad'} de 
                            {selectedProduct.name} al carrito?
                        </p>
                        <div className="btn-container">
                            <button className="btn-cancel" onClick={() => { setIsAddModalOpen(false); setQuantity(1); }}>
                                Cancelar
                            </button>
                            <button className="btn-save" onClick={handleConfirmAdd}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
