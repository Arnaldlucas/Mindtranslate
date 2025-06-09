import { useNavigate } from "react-router-dom";
import { BookOpenText } from "lucide-react";

export default function Termos() {
  const navigatee = useNavigate();

  const termos = [
    {
      termo: "Function",
      traducao: "Função",
      descricao:
        "Bloco de código reutilizável que executa uma tarefa específica.",
    },
    {
      termo: "Loop",
      traducao: "Laço",
      descricao:
        "Estrutura que repete uma sequência de instruções enquanto uma condição for verdadeira.",
    },
    {
      termo: "Array",
      traducao: "Vetor",
      descricao: "Coleção de dados ordenados acessados por índice.",
    },
    {
      termo: "Variable",
      traducao: "Variável",
      descricao:
        "Espaço na memória usado para armazenar dados temporariamente.",
    },
    {
      termo: "Object",
      traducao: "Objeto",
      descricao: "Estrutura que agrupa dados e funcionalidades relacionadas.",
    },
    {
      termo: "Class",
      traducao: "Classe",
      descricao: "Modelo para criar objetos com propriedades e métodos.",
    },
    {
      termo: "Boolean",
      traducao: "Booleano",
      descricao: "Tipo de dado que representa verdadeiro ou falso.",
    },
    {
      termo: "Condition",
      traducao: "Condição",
      descricao:
        "Bloco de código que é executado com base em uma verificação lógica.",
    },
    {
      termo: "Parameter",
      traducao: "Parâmetro",
      descricao:
        "Valor passado para uma função para personalizar seu comportamento.",
    },
    {
      termo: "Return",
      traducao: "Retorno",
      descricao: "Valor que uma função devolve após ser executada.",
    },
  ];

  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpenText className="text-blue-600 w-6 h-6" />
          <h1 className="text-2xl font-bold">Termos de Programação</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {termos.map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-sm p-6 rounded-xl border hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-1 text-blue-700">
                {item.termo}{" "}
                <span className="text-gray-500 text-sm">({item.traducao})</span>
              </h2>
              <p className="text-gray-600 text-sm">{item.descricao}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigatee("/dashboard")}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
