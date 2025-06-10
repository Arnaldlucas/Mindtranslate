// ARQUIVO: src/main.jsx (VERSÃO CORRIGIDA)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// 1. Importe a sua "central de autenticação"
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Coloque o AuthProvider aqui, abraçando o seu App. */}
      {/* A ordem é importante: BrowserRouter > AuthProvider > App */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
