import React from 'react'
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
  return (
<>
      <div className="search-bar">
            <div className="search-container">
                <input className="search-box" type="text" placeholder="Buscar productos..." aria-label="Buscar productos"/>
                <button className="btn-search">
                    <FontAwesomeIcon icon= {faSearch} />
                    
                </button>
            </div>
    </div>
    </>
    )
}
