import { useNavigate } from "react-router-dom";
import { BarChart } from "lucide-react";

export default function Progresso() {
  const navigate = useNavigate();

  const Progresso = {
    quizzesFeitos: 8,
    termosAprendidos: 23,
    percentualConcluido: 65,
  };

  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BarChart className="text-green-600 w-6 h-6" />
          <h1 className="text-2xl font-bold">Seu Progresso</h1>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Quizzes realizados:</h2>
            <p className="text-gray-600 text-xl">{Progresso.quizzesFeitos}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Termos aprendidos:</h2>
            <p className="text-gray-600 text-xl">
              {Progresso.termosAprendidos}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Conclusão da jornada:</h2>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${Progresso.percentualConcluido}%` }}
              ></div>
            </div>
            <p className="text-gray-700 mt-1">
              {Progresso.percentualConcluido}% concluído
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
