import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { User, Mail, LogOut, Loader, AlertCircle } from "lucide-react";

// Componente de UI para feedback de carregamento. Mantém o JSX principal limpo.
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader className="animate-spin text-blue-600" size={40} />
  </div>
);

// Componente de UI para feedback de erro.
const ErrorDisplay = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
    <AlertCircle size={40} />
    <p className="mt-4 text-center">{message}</p>
  </div>
);

export default function Perfil() {
  // 1. Conecta-se à nossa fonte da verdade para obter o usuário e a função de logout.
  const { currentUser, logout } = useAuth();

  // 2. Estados para gerenciar o ciclo de vida dos dados do perfil.
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Efeito para buscar dados do Firestore assim que o usuário da autenticação estiver disponível.
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) {
        // Se não há usuário, não há perfil para buscar.
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          // Este caso pode acontecer se a criação do documento falhar no registro.
          console.error(
            "Perfil não encontrado no Firestore para o UID:",
            currentUser.uid
          );
          setError("Não foi possível carregar os detalhes do seu perfil.");
        }
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError("Ocorreu um erro de rede ao buscar seus dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]); // A dependência garante que isso rode sempre que o 'currentUser' mudar.

  const handleLogout = async () => {
    try {
      await logout();
      // A navegação para /login será tratada automaticamente pelo nosso ProtectedRoute.
    } catch (err) {
      console.error("Falha no logout:", err);
    }
  };

  // 4. Renderização condicional: a melhor prática para componentes que dependem de dados.
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  // Se não estamos carregando e não há erros, renderizamos a UI com os dados reais.
  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <User className="text-blue-600" /> Perfil do Usuário
        </h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          {/* Nome vindo do Firestore */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Nome</label>
            <div className="flex items-center justify-between border px-4 py-2 rounded-md">
              <span>{userProfile?.name || "Nome não informado"}</span>
            </div>
          </div>

          {/* E-mail vindo do Firebase Auth */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">E-mail</label>
            <div className="flex items-center justify-between border px-4 py-2 rounded-md">
              <span>{currentUser?.email}</span>
            </div>
          </div>

          {/* Campo de Senha removido por segurança */}
          <div>
            <p className="text-sm text-gray-600 p-2 bg-gray-100 rounded-md">
              Por segurança, sua senha não é exibida. A funcionalidade de
              alteração de senha deve ser um fluxo separado e seguro.
            </p>
          </div>
        </div>

        {/* Botão de Logout funcional */}
        <div className="mt-10 text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center gap-2 mx-auto"
          >
            <LogOut size={16} />
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
}
