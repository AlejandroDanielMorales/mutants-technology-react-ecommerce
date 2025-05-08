
import React from 'react';
import './Categories.css';
import Category from '../Category/Category';
import { useCategories } from '../../context/CategoryProvider';

const API_URL = import.meta.env.VITE_API_URL; 

export default function Categories() {
  const { categories , hasProductsInCategory } = useCategories();


 
  
  const filteredCategories = categories.filter(cat => hasProductsInCategory(cat.name));

  return (
    <section className="main-categories">
      <div className="cat-container">
        {filteredCategories.map((cat) => (
          <Category
            key={cat._id}
            title={cat.name}
            subtitle={cat.description}
            imageSrc={`${API_URL}/uploads/categories/${cat.image}`}
            link={`#main-section-${cat._id}`}
          />
        ))}
      </div>
    </section>
  );
}
