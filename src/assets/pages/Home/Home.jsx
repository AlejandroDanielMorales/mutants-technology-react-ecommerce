import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import Features from '../../components/Features/Features';
import Categories from '../../components/Categories/Categories';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductsList from '../../components/ProductsList/ProductsList';
import { useCategories } from '../../context/CategoryProvider';
import { useOrder } from '../../context/OrderContext';
import { useUser } from '../../context/UserProvider';
import Spinner from '../../components/Spinner/Spinner';

export default function Home() {
  const { categories } = useCategories();
  const { products } = useOrder();
  const { fechCurrentUser } = useUser();

  const isLoading = !categories || !products || categories.length === 0 || products.length === 0;

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

      {isLoading ? (
        <Spinner />
      ) : (
        categories.map((cat) => {
          const filteredProducts = filterProductsByCategory(cat.name);
          return filteredProducts.length > 0 ? (
            <ProductsList
              key={cat._id}
              title={cat.description || cat.name}
              products={filteredProducts}
            />
          ) : null;
        })
      )}

      <Features />
    </>
  );
}
