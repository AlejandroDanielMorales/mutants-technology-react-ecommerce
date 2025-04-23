import React from 'react';
import './Categories.css';
import Category from '../Category/Category';
import { useCategories } from '../../context/CategoryProvider';

export default function Categories() {
  const { categories } = useCategories();

  return (
    <section className="main-categories">
      <div className="cat-container">
        {categories.map((cat) => (
          <Category
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
