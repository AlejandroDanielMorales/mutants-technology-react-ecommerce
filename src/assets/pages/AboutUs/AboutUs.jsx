import React from 'react';
import ServicesList from '../../components/ServicesList/ServicesList';
import "../../components/Header/Header.css"

export default function AboutUs() {
    return (
        <main className="main-container">
            <section className="hero">
                <h1>Mutants Technologies</h1>
                <h2>Los mejores amigos de tu PC</h2>
            </section>

            <section id="about-section" className="about-section">
                <h2>¿Quiénes Somos?</h2>
                <p>
                    En nuestro corazón late una profunda pasión por el gaming y la tecnología. Somos un equipo diverso de entusiastas, gamers y expertos en hardware que se unen con un objetivo claro: ofrecer a cada jugador la mejor experiencia posible. Nos dedicamos a proporcionar los mejores componentes para PC, abarcando desde el hardware esencial hasta los periféricos más avanzados.
                </p>
            </section>

            <ServicesList />
        </main>
    );
}
