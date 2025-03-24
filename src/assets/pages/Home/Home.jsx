import React from 'react';
import ProductsList from '../../components/ProductsList/ProductsList'; // Ruta corregida
import Banner from './../../components/Banner/Banner'; // Ruta corregida
import Features from './../../components/Features/Features'; // Ruta corregida
import Categories from '../../components/Categories/Categories';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useOrder } from "../../context/OrderContext";

export default function Home() {
    const  { onAddToCart }   = useOrder() ;
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