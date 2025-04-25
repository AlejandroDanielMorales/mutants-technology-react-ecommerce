import React from 'react';
import './Categories.css';
import Category from '../Category/Category';
import { useCategories } from '../../context/CategoryProvider';
import { useOrder } from '../../context/OrderContext';

export default function Categories() {
  const { categories } = useCategories();
  const { products } = useOrder();

  const hasProductsInCategory = (categoryName) => {
    const result = products.some(product => product.category.toLowerCase() === categoryName.toLowerCase());
    console.log(`¿Tiene productos la categoría "${categoryName}"?`, result);
    return result;
  };
  
  const filteredCategories = categories.filter(cat => hasProductsInCategory(cat.name));

  return (
    <section className="main-categories">
      <div className="cat-container">
        {filteredCategories.map((cat) => (
          <Category
            key={cat._id}
            title={cat.name}
            subtitle={cat.description}
            imageSrc={`http://localhost:3000/api/uploads/categories/${cat.image}`}
            link={`#main-section-${cat._id}`}
          />
        ))}
      </div>
    </section>
  );
}
