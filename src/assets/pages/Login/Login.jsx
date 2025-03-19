import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login({ onLoginSuccess }) {
  return (
    <div className="login-page">
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  );
}