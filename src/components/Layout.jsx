import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut, User, Book, Home as HomeIcon, Brain } from "lucide-react";
import NavLinkItem from "./NavLinkItem"; // Importa nosso novo componente

export default function Layout() {
  // 1. Busca os dados reais e a função de logout do nosso contexto.
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Não é necessário navegar aqui. O ProtectedRoute fará o trabalho
      // de redirecionar para /login assim que o currentUser se tornar null.
    } catch (error) {
      console.error("Falha no logout:", error);
    }
  };

  // Se o contexto ainda está carregando, não mostramos nada para evitar um "flash" de layout sem dados.
  if (!currentUser) {
    return null; // Ou um spinner de tela cheia.
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* 2. Logo agora é um Link semântico */}
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 cursor-pointer"
          >
            <Brain className="text-blue-600 w-6 h-6" />
            <h1 className="text-xl font-bold">MindTranslate</h1>
          </Link>

          {/* 3. Navegação declarativa e reutilizável */}
          <nav className="hidden md:flex space-x-6">
            <NavLinkItem to="/dashboard" icon={HomeIcon}>Início</NavLinkItem>
            <NavLinkItem to="/termos" icon={Book}>Termos</NavLinkItem>
            <NavLinkItem to="/quiz">Quiz</NavLinkItem>
            {/* Adicione outras rotas aqui se necessário */}
          </nav>

          {/* 4. Dropdown de Usuário com dados reais e logout funcional */}
          <div className="relative group">
            <button className="flex items-center space-x-2">
              <User size={20} />
              {/* Mostra o primeiro nome do usuário real */}
              <span className="hidden md:block">{currentUser.displayName || currentUser.email.split('@')[0]}</span>
            </button>
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg p-4 text-sm
                            invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              <p className="font-semibold truncate">{currentUser.displayName || 'Usuário'}</p>
              <p className="text-gray-500 text-xs mb-3 truncate">{currentUser.email}</p>
              <div className="border-t my-2"></div>
              <Link to="/perfil" className="flex items-center gap-2 w-full text-left py-2 px-2 hover:bg-gray-100 rounded-md">
                <User size={16} /> Meu Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-500 gap-2 w-full text-left py-2 px-2 hover:bg-gray-100 rounded-md"
              >
                <LogOut size={16} /> Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo dinâmico renderizado pelo React Router */}
      <main className="flex-1 mt-24 px-6">
        <Outlet />
      </main>

      {/* Footer (sem alterações necessárias) */}
      <footer className="bg-white border-t mt-16 py-6 text-center text-sm text-gray-500">
         {/* ... seu footer ... */}
         <p>&copy; {new Date().getFullYear()} MindTranslate. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}