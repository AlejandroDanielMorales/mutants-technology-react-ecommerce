import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import './ProductsList.css';

export default function ProductsList({ title , ref ,products }) {
    const sectionRef = useRef(null);

    const handleScroll = (direction) => {
        if (sectionRef.current) {
            const scrollAmount = 300;
            sectionRef.current.scrollBy({ 
                left: direction === 'left' ? -scrollAmount : scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };

    return (
        <div  id={`${ref}`} className="product-list-section">
            {title && <h3>{title}</h3>}
            <section className="main-section">



                <button 
                    className="scroll-button left" 
                    onClick={() => handleScroll('left')}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="1x" className='arrow-scroll'/>
                </button>
                <div className="product-cards-container" ref={sectionRef}>
                    {products.length === 0 && <p>No products available</p>}
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <button 
                    className="scroll-button right" 
                    onClick={() => handleScroll('right')}
                >
                    <FontAwesomeIcon icon={faArrowRight} size="1x" />
                </button>
            </section>
        </div>
    );
}