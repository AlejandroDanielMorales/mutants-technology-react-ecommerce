import { createContext, useContext, useState, useEffect } from "react";
import { useOrder } from './OrderContext';
import Swal from 'sweetalert2';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export function CategoryProvider({ children }) {
  const { products } = useOrder();
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
      const { data } = await axios.get(`${API_URL}/categories`);
      setCategories(data);
      localStorage.setItem("categories", JSON.stringify(data));
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const hasProductsInCategoryByID = async (categoryId) => {
    try {
      const { data: category } = await axios.get(`${API_URL}/categories/${categoryId}`);

      const result = products.some(product =>
        product.category.toLowerCase() === category.name.toLowerCase()
      );

      return result;
    } catch (error) {
      console.error("Error al obtener la categoría:", error);
      return false;
    }
  };

  const deleteCategory = async (categoryId,closeModal) => {
    try {
      const hasProducts = await hasProductsInCategoryByID(categoryId);

      if (hasProducts) {
        await Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'Esta categoría ya tiene productos asignados, borra los productos primero',
          confirmButtonText: 'Ok',
        });
        return;
      }

      await axios.delete(`${API_URL}/categories/${categoryId}`);

      const updatedCategories = categories.filter(cat => cat._id !== categoryId);
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      await Swal.fire({
        icon: 'success',
        text: 'Categoria Eliminada',
        confirmButtonText: 'Ok',
      });
      closeModal();
      

    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  const hasProductsInCategory = (categoryName) => {
    const result = products.some(product =>
      product.category.toLowerCase() === categoryName.toLowerCase()
    );
    return result;
  };

  return (
    <CategoryContext.Provider value={{
      categories,
      setCategories,
      fetchCategories,
      hasProductsInCategory,
      deleteCategory
    }}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;
