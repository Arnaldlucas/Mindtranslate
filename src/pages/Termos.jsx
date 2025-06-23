import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase-config"; // Importa nossa instância do Firestore
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { BookOpenText, Search, Loader, AlertCircle } from "lucide-react";

export default function Termos() {
  // 1. Estados para gerenciar todo o ciclo de vida dos dados
  const [allTerms, setAllTerms] = useState([]); // Lista original vinda do DB
  const [filteredTerms, setFilteredTerms] = useState([]); // Lista filtrada para exibição
  const [searchTerm, setSearchTerm] = useState(""); // O texto da busca
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial
  const [error, setError] = useState(null); // Estado para erros de busca

  // 2. Efeito para buscar os dados do Firestore uma única vez, quando o componente monta.
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        // Cria uma query para buscar os termos, ordenados alfabeticamente
        const termsQuery = query(collection(db, "terms"), orderBy("term"));
        const querySnapshot = await getDocs(termsQuery);
        const termsData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Guarda o ID do documento, essencial para a key do React
          ...doc.data(),
        }));
        setAllTerms(termsData);
        setFilteredTerms(termsData);
      } catch (err) {
        console.error("Erro ao buscar termos:", err);
        setError("Não foi possível carregar os termos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []); // O array vazio [] garante que isso rode apenas uma vez.

  // 3. Efeito para filtrar os termos em tempo real sempre que a busca mudar.
  useEffect(() => {
    const results = allTerms.filter(
      (item) =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTerms(results);
  }, [searchTerm, allTerms]);

  // Renderização condicional: crucial para uma boa UX
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <AlertCircle size={40} />
        <p className="mt-4 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <BookOpenText className="text-blue-600 w-6 h-6" />
          <h1 className="text-2xl font-bold">Termos de Programação</h1>
        </div>

        {/* 4. Barra de Busca Funcional */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Buscar por termo ou tradução..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
        </div>
        
        {/* 5. Grid de Termos Dinâmico e Inteligente */}
        {filteredTerms.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTerms.map((item) => (
              <div
                key={item.id} // Usando o ID do documento, que é a melhor prática
                className="bg-white shadow-sm p-6 rounded-xl border hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-1 text-blue-700">
                  {item.term}{" "}
                  <span className="text-gray-500 text-sm">({item.translation})</span>
                </h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">Nenhum termo encontrado para "{searchTerm}".</p>
          </div>
        )}

        {/* 6. Botão de Navegação com Link */}
        <div className="mt-12 text-center">
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
} 