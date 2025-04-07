import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../../components/Banner/Banner';
import Features from '../../components/Features/Features';
import Categories from '../../components/Categories/Categories';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductsList from '../../components/ProductsList/ProductsList';

export default function Home() {
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

    // Filtrar productos por categoría
    const filterProductsByCategory = (category) => {
        return products.filter(product => product.category === category);
    };

    return (
        <>
            <Banner />
            <SearchBar />
            <Categories />
            
            {/* Secciones de productos */}
            <ProductsList 
                title="El cerebro de tu sistema"
                products={filterProductsByCategory("Procesadores")} 
            />
            
            <ProductsList 
                title="Memoria para rato"
                products={filterProductsByCategory("Memorias RAM")} 
            />
            
            <ProductsList 
                title="Placas de video"
                products={filterProductsByCategory("Tarjetas Gráficas")} 
            />
            
            <ProductsList 
                title="Potencia sin límites"
                products={filterProductsByCategory("Fuentes de Poder")} 
            />
            
            <ProductsList 
                title="Lo que ves es lo que hay"
                products={filterProductsByCategory("Monitores")} 
            />
            
            <Features />
        </>
    );
}