// DashBoard.jsx (Código corrigido)

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { db } from "./firebase-config";
import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore";
import { BookOpen, HelpCircle, BarChart3, Loader } from "lucide-react";


// O array de cards agora é a nossa única fonte para os cards.
const staticCards = [
  {
    id: "termos",
    title: "Tradução de Termos",
    desc: "Aprenda a tradução de palavras técnicas do código com exemplos práticos.",
    to: "/termos",
    icon: <BookOpen className="text-blue-500 w-8 h-8" />,
  },
  {
    id: "quiz",
    title: "Quiz Interativo",
    desc: "Teste seus conhecimentos com quizzes rápidos e divertidos.",
    to: "/quiz",
    icon: <HelpCircle className="text-blue-500 w-8 h-8" />,
  },
  {
    id: "progresso",
    title: "Progressão de Aprendizado",
    desc: "Acompanhe seu progresso com relatórios e estatísticas.",
    to: "/progresso",
    icon: <BarChart3 className="text-blue-500 w-8 h-8" />,
  },
];

export default function DashBoard() {
  const { currentUser } = useAuth();
  const [quizzesFeitos, setQuizzesFeitos] = useState(0);
  
  // ✅ NOVO: Adiciona um estado para armazenar o nome do usuário vindo do Firestore
  const [userName, setUserName] = useState("Usuário");
  const [loading, setLoading] = useState(true);

// ✅ Mantemos os novos estados para o nome do usuário e o carregamento.
  const [userName, setUserName] = useState("Usuário");
  const [loading, setLoading] = useState(true);

  // ✅ Mantemos este useEffect da branch "fix/dashboard-nome-boas-vindas"
  // para buscar o nome completo do usuário UMA ÚNICA VEZ.
  useEffect(() => {
    const fetchUserName = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().name) {
          // Se o documento existe e tem um nome, usa ele.
          setUserName(docSnap.data().name);
        } else {
          // Se não, usa o nome de exibição do Auth ou o email como alternativa.
          setUserName(currentUser.displayName || currentUser.email?.split('@')[0] || "Usuário");
        }
      } catch (err) {
        console.error("Erro ao buscar o nome:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, [currentUser]);
  
  // ✅ Mantemos este useEffect da branch "main"
  // para "escutar" a contagem de quizzes em TEMPO REAL.
  useEffect(() => {
    if (!currentUser) return;

    const progressCollectionRef = collection(
      db,
      "users",
      currentUser.uid,
      "quizProgress"
    );
    const q = query(progressCollectionRef);
    
    // onSnapshot garante que a contagem de quizzes seja sempre a mais atual.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setQuizzesFeitos(querySnapshot.size);
    });

    // Função de limpeza para parar de "escutar" quando o usuário sair da página.
    return () => unsubscribe();
  }, [currentUser]);

  // ✅ Mantemos o estado de carregamento para uma melhor experiência de usuário.
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-full bg-blue-50 overflow-hidden">
      {/* 1. Imagem de fundo agora está 50% mais transparente (opacity-10) */}
      <img
        src="/welcome-illustration.svg"
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl opacity-10 z-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Seção de Boas-vindas (sem o botão) */}
        <section className="text-center mb-16">
          {/* ✅ CORRIGIDO: Agora usa o estado 'userName' */}
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Bem-vindo, {userName.split(" ")[0]}!</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {quizzesFeitos > 0
              ? `Você já completou ${quizzesFeitos} quiz(zes). Continue seu aprendizado!`
              : "Explore as seções abaixo para começar sua jornada no mundo da programação."}
          </p>
        </section>

        {/* 2. Seção dos Cards com grid responsivo para 3 itens */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticCards.map((card) => (
            <Link
              to={card.to}
              key={card.id}
              className="flex flex-col items-center text-center bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide flex-grow">
                {card.desc}
              </p>
            </Link>
          ))}
        </section>

        {/* 3. Botão "Comece a aprender" agora está aqui, abaixo dos cards */}
        <section className="mt-16 text-center">
          <Link
            to="/termos"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            Comece a aprender
          </Link>
        </section>
      </div>
    </div>
  );
}
