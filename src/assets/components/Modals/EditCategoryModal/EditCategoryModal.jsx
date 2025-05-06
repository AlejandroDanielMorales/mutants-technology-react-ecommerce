// src/components/EditCategoryModal/EditCategoryModal.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faSave } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../EditProductModal/EditProductModal.css"; // Reutilizás estilos
import { useCategories } from "../../../context/CategoryProvider";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditCategoryModal({ closeModal, categoryId }) {
  const { fetchCategories } = useCategories();
  const [existingImage, setExistingImage] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories/${categoryId}`);
        const data = response.data;

        Object.keys(data).forEach((key) => {
          if (key !== "_id") setValue(key, data[key]);
        });

        if (data.image) {
          setExistingImage(`${API_URL}/uploads/${data.image}`);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    if (categoryId) {
      fetchCategory();
    } else {
      reset({ name: "", description: "" });
    }
  }, [categoryId, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      let response;
      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("description", data.description);

        response = await axios.put(`${API_URL}/categories/${categoryId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        const categoryData = {
          description: data.description,
          image: existingImage?.split("/uploads/")[1] || "",
        };

        response = await axios.put(`${API_URL}/categories/${categoryId}`, categoryData);
      }
        console.log("Categoría actualizada:", response.data);
      fetchCategories();
      closeModal();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Categoría</h3>
        <form className="form-edit" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              disabled
              {...register("name")}
            />
        </div>

          <div>
            <label>Descripción:</label>
            <input
              type="text"
              {...register("description")}
            />
          </div>

          <div>
            <label>Imagen actual:</label>
            {existingImage && (
              <div style={{ marginBottom: "10px" }}>
                <img src={existingImage} alt="Imagen actual" style={{ width: "100px" }} />
              </div>
            )}

            <label>Subir nueva imagen:</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
            />
            <small>(Opcional)</small>
          </div>

          <div className="btn-container">
            <button type="button" className="btn-cancel" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimesCircle} className="btn-icon" />
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              <FontAwesomeIcon icon={faSave} className="btn-icon" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
