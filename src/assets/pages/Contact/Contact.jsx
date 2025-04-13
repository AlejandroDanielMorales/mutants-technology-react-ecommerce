import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import Map from "../../components/Map/Map";
import "../../components/ProductsList/ProductsList.css";
import "./Contact.css";
export default function Contact()  {
  return (
    <main class="container contact-container">
  <div class="contact-content">
  <div class="back-form  ">
        <ContactForm />
        <Map />
      </div>
  </div>
    </main>
  );
};

