import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../../components/Banner/Banner';
import Features from '../../components/Features/Features';
import Categories from '../../components/Categories/Categories';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductsList from '../../components/ProductsList/ProductsList';
import { useCategories } from '../../context/CategoryProvider';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { categories } = useCategories();
  const url = "http://localhost:3000/api/products";

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

  const filterProductsByCategory = (categoryName) => {
    return products.filter(product => product.category === categoryName);
  };

  return (
    <>
      <Banner />
      <SearchBar />
      <Categories />

      {categories.map((cat) => (
        <ProductsList
          key={cat._id}
          ref={`main-section-${cat._id}`}
          title={cat.description || cat.name}
          products={filterProductsByCategory(cat.name)}
        />
      ))}

      <Features />
    </>
  );
}
