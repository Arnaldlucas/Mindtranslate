import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { BookOpen, HelpCircle, BarChart3 } from "lucide-react";

// 1. A constante 'cards' foi movida para fora do componente.
// Ela só é criada uma vez quando o módulo é carregado.
const cards = [
  {
    id: "termos", // Usar um ID único é melhor que o índice para a key do React.
    title: "Tradução de Termos",
    desc: "Aprenda a tradução de palavras técnicas do código com exemplos práticos.",
    to: "/termos",
    icon: <BookOpen className="text-blue-500 w-6 h-6 mb-3" />,
  },
  {
    id: "quiz",
    title: "Quiz Interativo",
    desc: "Teste seus conhecimentos com quizzes rápidos e divertidos.",
    to: "/quiz",
    icon: <HelpCircle className="text-blue-500 w-6 h-6 mb-3" />,
  },
  {
    id: "progresso",
    title: "Progressão de Aprendizado",
    desc: "Acompanhe seu progresso com relatórios e estatísticas.",
    to: "/progresso",
    icon: <BarChart3 className="text-blue-500 w-6 h-6 mb-3" />,
  },
];

export default function DashBoard() {
  // 2. Usamos o hook para obter os dados do usuário real.
  const { currentUser } = useAuth();

  // Extrai o primeiro nome para uma saudação mais pessoal.
  const firstName = currentUser?.displayName?.split(" ")[0] || currentUser?.email.split('@')[0] || "Usuário";

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-b from-blue-50 via-blue-100 to-white">
      {/* Boas-vindas com imagem e personalização */}
      <section className="text-center max-w-3xl mx-auto mb-12 px-4">
        <img
          src="/welcome-illustration.svg"
          alt="Bem-vindo"
          className="w-full max-w-md mx-auto mb-10"
          loading="lazy" // 3. Otimização de performance da imagem.
          decoding="async"
        />
        {/* 4. Saudação personalizada */}
        <h2 className="text-3xl font-bold mb-2">Bem-vindo, {firstName}!</h2>
        <p className="text-gray-600 text-lg">
          Aprenda os termos mais usados na programação de forma simples, visual
          e interativa.
        </p>
        {/* 5. Navegação declarativa com Link */}
        <Link
          to="/termos"
          className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition"
        >
          Comece agora
        </Link>
      </section>

      {/* Cards agora são Links clicáveis */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
        {cards.map((card) => (
          // 6. O card inteiro agora é um Link, tornando-o acessível e semântico.
          <Link
            to={card.to}
            key={card.id}
            className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:border hover:border-blue-400 transition transform hover:scale-[1.03]"
          >
            {card.icon}
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
              {card.desc}
            </p>
          </Link>
        ))}
      </section>

      {/* Frase de destaque (sem alterações necessárias) */}
      <section className="mt-16 text-center px-4">
        <blockquote className="italic text-indigo-700 text-xl font-medium max-w-xl mx-auto">
          "Aprender a linguagem da tecnologia é como ganhar superpoderes."
        </blockquote>
      </section>
    </div>
  );
}