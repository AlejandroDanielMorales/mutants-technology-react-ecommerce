import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ProductsList.css';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductsList({onAddToCart}) {
    const [products, setProducts] = useState([]);
    const url = "https://67d4cb0dd2c7857431ee920f.mockapi.io/products";

    const getProducts = async () => {
        try {
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Referencias para las secciones de productos
    const processorsSectionRef = useRef(null);
    const ramSectionRef = useRef(null);
    const gpuSectionRef = useRef(null);
    const powerSupplySectionRef = useRef(null);
    const monitorsSectionRef = useRef(null);

    // Función para manejar el scroll horizontal
    const handleScroll = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = 300; // Cantidad de scroll en píxeles
            if (direction === 'left') {
                ref.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <main className="main-container">
            <h3>El cerebro de tu sistema, potencia sin límites</h3>
            <section className="main-section" id="main-sectionprcs">
                <button className="scroll-button left" onClick={() => handleScroll(processorsSectionRef, 'left')}>‹</button>
                <div className="product-cards-container" ref={processorsSectionRef}>
                    {products.map((product) => (product.category === "Procesadores" &&
                        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart}  />

                    ))}
                </div>
                <button className="scroll-button right" onClick={() => handleScroll(processorsSectionRef, 'right')}>›</button>
            </section>

            <h3>Memoria para rato</h3>
            <section className="main-section" id="main-sectionmram">
                <button className="scroll-button left" onClick={() => handleScroll(ramSectionRef, 'left')}>‹</button>
                <div className="product-cards-container" ref={ramSectionRef}>
                    {products.map((product) => (product.category === "Memorias RAM" &&
                        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />

                    ))}
                </div>
                <button className="scroll-button right" onClick={() => handleScroll(ramSectionRef, 'right')}>›</button>
            </section>

            <h3>Placas de video</h3>
            <section className="main-section" id="main-sectiontjgr">
                <button className="scroll-button left" onClick={() => handleScroll(gpuSectionRef, 'left')}>‹</button>
                <div className="product-cards-container" ref={gpuSectionRef}>
                    {products.map((product) => (product.category === "Tarjetas Gráficas" &&
                        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />

                    ))}
                </div>
                <button className="scroll-button right" onClick={() => handleScroll(gpuSectionRef, 'right')}>›</button>
            </section>

            <h3>Fuentes de Poder</h3>
            <section className="main-section" id="main-sectionfts">
                <button className="scroll-button left" onClick={() => handleScroll(powerSupplySectionRef, 'left')}>‹</button>
                <div className="product-cards-container" ref={powerSupplySectionRef}>
                    {products.map((product) => (product.category === "Fuentes de Poder" &&
                        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                    ))}
                </div>
                <button className="scroll-button right" onClick={() => handleScroll(powerSupplySectionRef, 'right')}>›</button>
            </section>

            <h3>Monitores</h3>
            <section className="main-section" id="main-sectionmtns">
                <button className="scroll-button left" onClick={() => handleScroll(monitorsSectionRef, 'left')}>‹</button>
                <div className="product-cards-container" ref={monitorsSectionRef}>
                    {products.map((product) => (product.category === "Monitores" &&
                       <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                    ))}
                </div>
                <button className="scroll-button right" onClick={() => handleScroll(monitorsSectionRef, 'right')}>›</button>
            </section>
        </main>
    );
}