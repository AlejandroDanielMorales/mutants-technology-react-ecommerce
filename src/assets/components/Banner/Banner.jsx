import React from 'react'
import './Banner.css'

export default function Banner() {
  return (
   
        <section className="main-banner">
            <div className="slider-content">
                <div className="slide slide-1"><img src="https://www.hp.com/content/dam/sites/worldwide/personal-computers/consumer/gaming/gaming-gateway/Hero%20banner%20Desktop@3x.jpg" alt="banner"/></div>
                <div className="slide slide-2"><img src="https://i0.wp.com/play-experience.com/wp-content/uploads/2020/04/Nvidia-Computer.jpg?resize=1280%2C720&ssl=1" alt="banner"/></div>
                <div className="slide slide-3"><img src="https://c4.wallpaperflare.com/wallpaper/869/662/349/technology-green-razer-keyboards-wallpaper-preview.jpg" alt="banner"/></div>
            </div>
            <div className="tittle-container">
                <h1>Mutants technologies</h1>
                <h2>Los mejores amigos de tu pc</h2>
            </div>
        </section>
   
  )
}
