import React, { useEffect } from "react";
import Swal from "sweetalert2";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.css";

export default function Login() {
  useEffect(() => {
    Swal.fire({
      title: "Cuenta de prueba",
      html: `
        <p><strong>Email:</strong> martinalejandrorodriguez@gmail.com</p>
        <p><strong>Password:</strong> bootcamp2025</p>
      `,
      icon: "info",
      confirmButtonText: "Entendido",
    });
  }, []);

  return (


<main class="container login-container">
  <div class="login-content">
  <LoginForm />
  </div>


     
    </main>
  );
}
