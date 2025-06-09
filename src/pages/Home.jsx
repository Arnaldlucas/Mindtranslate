import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function onLoginClick() {
    navigate("/Login");
  }
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Mindtranslate</h1>
          <nav className="space-x-4">
            <a href="/dashboard" className="text-gray-600 hover:text-black">
              Início
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              Sobre
            </a>
          </nav>
        </div>
      </header>

      <section className="text-center py-24 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Aprenda os termos da progamação se divertindo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Com a nossa a ajuda voce pode aprender os termos da programação de uma
          forma divertida.
        </p>
        <button
          onClick={onLoginClick}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Começar agora
        </button>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500">
        &copy; 2025 - Todos os direitos reservados
      </footer>
    </main>
  );
}

export default Home;
