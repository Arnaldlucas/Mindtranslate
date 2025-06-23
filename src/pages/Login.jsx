import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "lucide-react"; // Importamos um ícone para o feedback de loading

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 1. Estado para controlar o envio

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true); // Inicia o feedback visual

    try {
      await login(email, password);
      // A navegação só ocorre em caso de sucesso absoluto.
      navigate("/dashboard");
    } catch (err) {
      // 2. Tratamento de erro específico baseado no código do Firebase
      console.error("LOGIN: Falha na autenticação:", err.code);
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError(
            "E-mail ou senha inválidos. Por favor, verifique e tente novamente."
          );
          break;
        case "auth/too-many-requests":
          setError(
            "Acesso temporariamente bloqueado devido a muitas tentativas. Tente novamente mais tarde."
          );
          break;
        default:
          setError("Ocorreu um erro inesperado. Por favor, tente novamente.");
          break;
      }
    } finally {
      // 3. Garante que o estado de envio seja resetado, não importa o resultado.
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Entrar</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          {/* 4. O botão agora é dinâmico e resiliente */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader className="animate-spin" /> : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}
