import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.css";

export default function Detail() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`https://67d4cb0dd2c7857431ee920f.mockapi.io/products/${id}`) 
            .then(response => setProduct(response.data))
            .catch(error => console.error("Error al obtener el producto:", error));
    }, [id]);

    if (!product) return <p>Cargando...</p>;

    return (
        <main className="cards-container-2">
            <h3 className="card-title-2"><em>{product.name}</em></h3>
            <div className="card-background-2">
                <article className="card-detail-2">
                    <img className="card-img-2" src={product.image} alt={product.name} />
                    <div className="card-body-2">
                        <h4><em>Especificaciones Técnicas</em></h4>
                        
                        <h4><em>Descripción</em></h4>
                        <p className="card-p">{product.description}</p>
                        <h4><em>Precio</em></h4>
                        <p className="card-p">${product.price}</p>
                        <div className="backdiv">
                            <button onClick={() => window.history.back()} className="card-btn-2">Volver</button>
                            <button className="card-btn-2">Agregar al carrito</button>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
