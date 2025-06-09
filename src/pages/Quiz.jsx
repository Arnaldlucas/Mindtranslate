import { useNavigate } from "react-router-dom";
import { HelpCircle } from "lucide-react";

export default function Quiz() {
  const navigate = useNavigate();

  const perguntas = [
    {
      pergunta: "O que significa a palavra 'loop' em programação?",
      opcoes: [
        "Condição",
        "Repetição",
        "Erro",
        "Declaração"
      ],
      resposta: "Repetição"
    },
    {
      pergunta: "Qual é a tradução mais comum para 'function'?",
      opcoes: ["Variável", "Objeto", "Função", "Classe"],
      resposta: "Função"
    },
    {
      pergunta: "Um 'array' é melhor descrito como:",
      opcoes: ["Função", "Objeto", "Vetor", "Loop"],
      resposta: "Vetor"
    }
  ];

  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="text-purple-600 w-6 h-6" />
          <h1 className="text-2xl font-bold">Quiz Interativo</h1>
        </div>

        <div className="space-y-6">
          {perguntas.map((q, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                {index + 1}. {q.pergunta}
              </h2>
              <ul className="space-y-2">
                {q.opcoes.map((opcao, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 border rounded hover:bg-purple-50 cursor-pointer"
                  >
                    {opcao}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}