import React from 'react';
import { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import Features from '../../components/Features/Features';
import Categories from '../../components/Categories/Categories';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductsList from '../../components/ProductsList/ProductsList';
import { useCategories } from '../../context/CategoryProvider';
import { useOrder } from '../../context/OrderContext';
import { useUser } from '../../context/UserProvider';

export default function Home() {
  const { categories } = useCategories();
  const { products} = useOrder();
  const{ fechCurrentUser } = useUser(); 
  

  // Fetch current user on component mount
useEffect(() => {
    fechCurrentUser();
  }, []);

  const filterProductsByCategory = (categoryName) => {
    return products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());
  };

  return (
    <>
      <Banner />
      <SearchBar />
      <Categories />

      {categories.map((cat) => {
        const filteredProducts = filterProductsByCategory(cat.name);
        console.log(cat._id);
        return filteredProducts.length > 0 ? (
          <ProductsList
            refkey={cat._id}
            title={cat.description || cat.name}
            products={filteredProducts}
          />
        ) : null;
      })}

      <Features />
    </>
  );
}
