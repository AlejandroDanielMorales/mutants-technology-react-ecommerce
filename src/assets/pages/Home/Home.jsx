import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../../components/Banner/Banner';
import Features from '../../components/Features/Features';
import Categories from '../../components/Categories/Categories';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductsList from '../../components/ProductsList/ProductsList';

export default function Home() {
    const [products, setProducts] = useState([]);
    const url = "http://localhost:3000/api/products";
    

    const getProducts = async () => {
        try {
            const response = await axios.get(url);
            console.log(response.data);
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
                ref="Procesadores"
                title="El cerebro de tu sistema"
                products={filterProductsByCategory("Procesadores")} 
            />
            
            <ProductsList 
                ref="Ram"
                title="Memoria para rato"
                products={filterProductsByCategory("Memorias RAM")} 
            />
            
            <ProductsList 
                ref="Placas"
                title="Placas de video"
                products={filterProductsByCategory("Tarjetas Gráficas")} 
            />
            
            <ProductsList 
                ref="Fuentes"
                title="Potencia sin límites"
                products={filterProductsByCategory("Fuentes de Poder")} 
            />
            
            <ProductsList 
                ref="Monitores"
                title="Lo que ves es lo que hay"
                products={filterProductsByCategory("Monitores")} 
            />
            
            <Features />
        </>
    );
}