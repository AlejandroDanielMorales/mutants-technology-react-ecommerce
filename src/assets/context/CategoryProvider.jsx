// src/context/useCategories.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/categories");
      setCategories(data);
      console.log(data);
      localStorage.setItem("categories", JSON.stringify(data));
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, setCategories,fetchCategories}}>
      {children}
    </CategoryContext.Provider>
  );
}
export default CategoryProvider;