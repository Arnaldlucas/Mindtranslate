import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Termos from "./pages/Termos";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Progresso from "./pages/Progresso";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas internas com layout compartilhado */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/progresso" element={<Progresso />} />
        <Route path="/perfil" element={<Perfil />} /> {/* ✅ novo */}
      </Route>

      {/* Rota fallback para páginas inexistentes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
