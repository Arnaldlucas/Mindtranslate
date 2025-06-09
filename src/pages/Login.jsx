import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function onRegisterClick() {
    navigate("/register");
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          MindTranslate
        </h2>
        <h8 className="flex items-center justify-center">Login in</h8>

        <form className="space-y-4">
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
              placeholder="seuemail@exemplo.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Não tem uma conta?{" "}
          <a
            onClick={onRegisterClick}
            className="text-blue-600 hover:underline"
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </main>
  );
}
