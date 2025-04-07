import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faEye, faStar, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import { useOrder } from "../../context/OrderContext"; 
export default function ProductCard({ product}) {
    const  { onAddToCart }   = useOrder() ;
    return (
        <div className="card-background-2" key={product.id}>
            <article className="card-2">
                <img className="card-img" src={product.image} alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">
                        <em>{product.name}</em>
                    </h5>
                    <p className="card-description">{product.description}</p>
                    <div className="card-price">
                        <FontAwesomeIcon icon={faDollarSign} className="price-icon" />
                        <span>{product.price}</span>
                    </div>
                    <div className="card-rating">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className={index < product.rating ? "star-icon filled" : "star-icon empty"}
                            />
                        ))}
                    </div>
                    <div className="card-actions">
                        <NavLink to={`/detail/${product.id}`} className="card-btn2">
                            <FontAwesomeIcon icon={faEye} className="btn-icon2" size="1x" color="#2E3239" />
                        </NavLink>
                        <button className="card-btn2" onClick={() => {onAddToCart(product)}}>
                            <FontAwesomeIcon icon={faShoppingCart} className="btn-icon2" size="1x" color="#2E3239" />
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
}
