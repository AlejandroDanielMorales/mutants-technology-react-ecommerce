import React from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';
import "./ServicesList.css"

const services = [
    {
        title: "Venta de PC Gaming",
        description: "Ofrecemos equipos de alta calidad y rendimiento para satisfacer tus necesidades de juego.",
        image: "https://www.hp.com/us-en/shop/app/assets/images/uploads/prod/how%20to%20optimize%20your%20pc%20for%20gaming1679674003388817.jpg",
        alt: "Venta de PC"
    },
    {
        title: "Instalación de Software",
        description: "Nos encargamos de instalar y configurar el software necesario para que estés listo para jugar.",
        image: "https://media.istockphoto.com/id/1465443741/photo/ai-artificial-intelligence-digital-software-technology-mobile-app-development-software-coding.jpg?s=612x612&w=0&k=20&c=HEI3yLug1JYpXRa7-V0RNNeHTwJyMQcT_uzsgndePB4=",
        alt: "Instalación de Software"
    },
    {
        title: "Envíos a Domicilio",
        description: "Recibe tus productos en la puerta de tu casa con nuestro servicio de envío a todo el país.",
        image: "https://www.repsol.es/content/dam/repsol-ecommerce/tienda/cambios-devoluciones/envios-hero.jpg.transform/rp-rendition-md/image.jpeg",
        alt: "Envíos"
    },
    {
        title: "Asesoramiento",
        description: "Nuestro equipo de expertos está listo para asesorarte en cualquier duda que tengas.",
        image: "https://img.freepik.com/fotos-premium/asesoramiento-hablando-gente-negocios-computadora-estrategia-capacitacion-colaboracion-gestion-trabajo-equipo-empleados-que-trabajan-proyecto-linea-junto-pc-conectividad_590464-188304.jpg",
        alt: "Asesoramiento"
    }
];

export default function ServicesList() {
    return (
        <section id="services" className="services">
             <div className="services-header">
             <h1>Mutants Technologies</h1>
                <h2>Los mejores amigos de tu PC</h2>

                <h2>¿Quiénes Somos?</h2>
                <p>
                    En nuestro corazón late una profunda pasión por el gaming y la tecnología. Somos un equipo diverso de entusiastas, gamers y expertos en hardware que se unen con un objetivo claro: ofrecer a cada jugador la mejor experiencia posible. Nos dedicamos a proporcionar los mejores componentes para PC, abarcando desde el hardware esencial hasta los periféricos más avanzados.
                </p>

             </div>
                

            <h2>Nuestros Servicios</h2>
            <div className="card-container">
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
        </section>
    );
}
