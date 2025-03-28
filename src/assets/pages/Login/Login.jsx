import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login({ onLoginSuccess }) {
  return (
    <main className="container">
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </main>
  );
}