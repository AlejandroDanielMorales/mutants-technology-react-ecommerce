// src/components/SearchResults/SearchResults.js
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./SearchResult.css";

export default function SearchResults({ results }) {
  if (!results.length) {
    return <p style={{ padding: '20px', textAlign: 'center' }}>No se encontraron productos.</p>;
  }

  return (
    <div className="results-grid">
      {results.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
