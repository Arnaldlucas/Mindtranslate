import { User, Pencil, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();

  const user = {
    nome: "João Silva",
    email: "joao@email.com",
    senha: "********",
  };

  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <User className="text-blue-600" /> Perfil do Usuário
        </h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Nome</label>
            <div className="flex items-center justify-between border px-4 py-2 rounded-md">
              <span>{user.nome}</span>
              <button className="text-blue-500 hover:text-blue-700">
                <Pencil size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">E-mail</label>
            <div className="flex items-center justify-between border px-4 py-2 rounded-md">
              <span>{user.email}</span>
              <button className="text-blue-500 hover:text-blue-700">
                <Mail size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Senha</label>
            <div className="flex items-center justify-between border px-4 py-2 rounded-md">
              <span>{user.senha}</span>
              <button className="text-blue-500 hover:text-blue-700">
                <Lock size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}