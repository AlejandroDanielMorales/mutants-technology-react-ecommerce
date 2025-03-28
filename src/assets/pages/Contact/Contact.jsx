import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import Map from "../../components/Map/Map";
import "../../components/ProductsList/ProductsList.css";

export default function Contact()  {
  return (
    <main class="container">
    <div class="back-form">
        <ContactForm />
        <Map />
      </div>
    </main>
  );
};

;