import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  // --- HOOKS NO NÍVEL SUPERIOR ---
  // Hooks sempre vêm primeiro, no topo do componente.
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // (Opcional) Adicione um estado para o nome se precisar dele
  const [name, setName] = useState("");

  // --- FUNÇÕES DE LÓGICA ---

  // Função para lidar com o registro do usuário
  const handleRegister = async (event) => {
    // 1. Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

    if (!email || !password) {
      alert("Por favor, preencha email e senha.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuário registrado:", userCredential.user);
      alert("Registro realizado com sucesso! Redirecionando para o login...");
      navigate("/login"); // 2. Redireciona após o sucesso
    } catch (error) {
      console.error("Erro no registro:", error.message);
      // Personaliza a mensagem de erro para o usuário
      if (error.code === "auth/email-already-in-use") {
        alert("Este e-mail já está em uso.");
      } else {
        alert("Ocorreu um erro no registro: " + error.message);
      }
    }
  };

  // Função para navegar de volta para a página de login
  const voltarParaLogin = () => {
    navigate("/login");
  };

  // --- JSX (A parte visual do componente) ---
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Criar Conta
        </h2>

        {/* 3. Use o evento onSubmit do formulário */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              placeholder="João da Silva"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={name} // 4. Conecte o estado ao input
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={email} // 4. Conecte o estado ao input
              onChange={(e) => setEmail(e.target.value)}
              required
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={password} // 4. Conecte o estado ao input
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 5. O botão agora é do tipo "submit" para acionar o onSubmit do form */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Já tem uma conta?{" "}
          <button
            onClick={voltarParaLogin}
            className="font-medium text-blue-600 hover:underline"
          >
            Entrar
          </button>
        </p>
      </div>
    </main>
  );
}
