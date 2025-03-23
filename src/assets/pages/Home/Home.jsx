import React from 'react';
import ProductsList from '../../components/ProductsList/ProductsList'; // Ruta corregida
import Banner from './../../components/Banner/Banner'; // Ruta corregida
import Features from './../../components/Features/Features'; // Ruta corregida
import Categories from '../../components/Categories/Categories';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function Home({ onAddToCart }) {
    return (
        <>
            <Banner/>
            <SearchBar/>
            <Categories/>
            <ProductsList  onAddToCart={onAddToCart}/>
            <Features/>
        </>
    );
}