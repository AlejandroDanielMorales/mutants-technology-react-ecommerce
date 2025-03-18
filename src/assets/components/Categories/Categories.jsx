import React from 'react';
import './Categories.css';
import Category from '../Category/Category';

export default function Categories() {
  return (
    <section className="main-categories">
      <div className="cat-container">
        <Category
          title="Procesadores"
          subtitle="2x1 en procesadores de 4 nucleos"
          imageSrc="https://th.bing.com/th/id/OIP.M-exfS5Z8Sd1naM1R3y_sAHaFj?rs=1&pid=ImgDetMain"
          link="#main-sectionprcs"
        />
        <Category
          title="Memorias RAM"
          subtitle="Con 12 y 24 meses de garantía"
          imageSrc="https://youget.pt/159437-large_default/memoria-ram-kingston-fury-beast-64gb-rgb-2x32-gb-ddr5-6000-mhz.jpg"
          link="#main-sectionmram"
        />
        <Category
          title="Tarjetas gráficas"
          subtitle="Amplia variedad de marcas y capacidades"
          imageSrc="https://w7.pngwing.com/pngs/206/900/png-transparent-graphics-cards-video-adapters-rgb-backlit-gaming-high-end-graphics-card-geforce-gtx-1080ti-lightning-z-micro-star-international-digital-visual-interface-gtx-electronic-device-geforce-gtx.png"
          link="#main-sectiontjgr"
        />
        <Category
          title="Fuentes de energia"
          subtitle="Este mes 70% off en efectivo"
          imageSrc="https://http2.mlstatic.com/D_NQ_NP_2X_656095-MLM40750451537_022020-F.jpg"
          link="#main-sectionfts"
        />
        <Category
          title="Monitores"
          subtitle="3x2 en monitores de 24 pulgadas"
          imageSrc="https://purepng.com/public/uploads/large/purepng.com-monitorelectronicslcd-led-computer-monitor-display-screen-941524675594s5c5c.png"
          link="#main-sectionmtns"
        />
      </div>
    </section>
  );
}
