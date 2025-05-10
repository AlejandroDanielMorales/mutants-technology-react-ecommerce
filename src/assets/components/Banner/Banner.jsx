import React from 'react'
import './Banner.css'
import Banner1 from '../Banner/Banner-1.webp';
import Banner2 from '../Banner/Banner-2.webp';
import Banner3 from '../Banner/Banner-3.webp';

export default function Banner() {
  return (
   
        <section className="main-banner">
            <div className="slider-content">
                <div className="slide slide-1"><img src={Banner1} alt="banner" /></div>
                <div className="slide slide-2"><img src={Banner2} alt="banner" /></div>
                <div className="slide slide-3"><img src={Banner3} alt="banner" /></div>
            </div>
            <div className="tittle-container">
                <h1>Mutants technologies</h1>
                <h2 >Los mejores amigos de tu pc</h2>
            </div>
        </section>
   
  )
}
