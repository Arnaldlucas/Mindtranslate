import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut, User, Book, Home as HomeIcon, Brain } from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = {
    name: "João Silva",
    email: "joao@email.com",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <Brain className="text-blue-600 w-6 h-6" />
            <h1 className="text-xl font-bold">MindTranslate</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              <HomeIcon size={16} /> Início
            </button>
            <button
              onClick={() => navigate("/termos")}
              className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              <Book size={16} /> Termos
            </button>
            <button
              onClick={() => navigate("/quiz")}
              className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              Quiz
            </button>
            <button
              onClick={() => navigate("/perfil")}
              className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              Perfil
            </button>
          </nav>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <User size={20} />
              <span className="hidden md:block">{user.name.split(" ")[0]}</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-4 text-sm">
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500 text-xs mb-2">{user.email}</p>
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center text-red-500 gap-2 hover:text-red-600"
                >
                  <LogOut size={16} /> Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo dinâmico */}
      <main className="flex-1 mt-24 px-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 py-6 text-center text-sm text-gray-500">
        <div className="flex justify-center gap-6 mb-2">
          <a href="#" className="hover:underline">
            Política de Privacidade
          </a>
          <a href="#" className="hover:underline">
            Termos de Uso
          </a>
          <a href="#" className="hover:underline">
            Ajuda
          </a>
        </div>
        <p>
          &copy; {new Date().getFullYear()} MindTranslate. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
