import { Navigate } from "react-router-dom";
// CAMINHO NOVO E CORRETO
import { useAuth } from "../hooks/useAuth";
// Em ProtectedRoute.jsx, no topo do componente
export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // Este log nos mostrará o "flagrante" da race condition
  console.log(
    "PROTECTED_ROUTE: Renderizando... Status do Usuário:",
    currentUser,
    "| Status do Carregamento:",
    loading
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  // 4. Se a verificação terminou e NÃO HÁ usuário no contexto, redireciona
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 5. Se a verificação terminou e HÁ um usuário, mostra a página protegida
  return children;
}
