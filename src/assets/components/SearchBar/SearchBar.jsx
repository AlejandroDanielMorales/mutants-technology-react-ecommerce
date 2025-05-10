// src/components/SearchBar/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../../context/OrderContext';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { searchProducts } = useOrder();

  const handleSearch = () => {
    if (query.trim()) {
      searchProducts(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          className="search-box"
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="btn-search" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}
