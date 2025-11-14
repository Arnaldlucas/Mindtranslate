🚀 Mensagem para a Equipe: Nosso Padrão de Trabalho (TP4)
Pessoal,
Para este trabalho, vamos seguir um fluxo profissional para que todos possam trabalhar ao mesmo tempo, sem quebrar o projeto e sem depender de uma única pessoa (Arnald) para aprovar tudo.
Nosso objetivo é trabalhar em paralelo e evitar conflitos.
Aqui estão nossas 4 regras de ouro. Leia isto antes de escrever uma linha de código.

1. Padrão de Branch: 1 Tarefa = 1 Branch
**NUNCA** faça commits na branch `feature/tp4-evolutiva`.
Sempre crie sua própria branch a partir dela.
**Padrão do Nome:** `[tipo]/[sua-tarefa-simples]`
* *Exemplos:* `feat/palavra-do-dia` ou `fix/quiz-teclado`

2. Padrão de Commit: "O que, Onde"
Use o padrão "Conventional Commit". É simples:
* `feat(dashboard): Adiciona card 'Palavra do Dia'`
* `fix(quiz): Corrige navegação de teclado no quiz`
* `refactor(perfil): Migra página de perfil para TypeScript (TSX)`

3. Padrão de Merge (Pull Request): A Regra da 1 Aprovação
Para evitar que Arnald seja um gargalo(atraso), não vamos ter um único mediador.
Quando sua branch estiver pronta, abra um Pull Request (PR) no GitHub para mesclar em `feature/tp4-evolutiva`.
Seu PR precisa de **UMA (1) aprovação** de QUALQUER OUTRO MEMBRO da equipe.
Nivaldo pode revisar o PR do João Victor. Victor Gabriel pode revisar o do Illgner. E assim por diante.
O autor do PR é responsável por mesclar assim que tiver a aprovação.

4. Padrão de Código (O Mais Importante): Evite Conflitos!
**A Regra do Escoteiro (TS):** O Arnald vai migrar o "coração" do app para TypeScript (TS). Depois disso, a regra é: se você tocar em um arquivo `.jsx` para fazer sua tarefa, seu primeiro commit DEVE ser renomeando-o para `.tsx` e corrigindo os tipos.
**Como Evitar Conflitos:** Nosso maior risco de conflito é o arquivo `dataService.ts`.
**SOLUÇÃO:** Ninguém (exceto Arnald na Fase 1) vai editar o `dataService.ts`.
Se sua feature precisa de lógica (ex: buscar "Palavra do Dia"), crie um novo arquivo de hook na sua própria pasta.
* *Exemplo:* Se João Victor está fazendo a "Palavra do Dia", ele deve criar o arquivo: `CodigoFonte/src/features/dashboard/useWordOfDay.ts`.
Isso garante que ninguém edite o mesmo arquivo, eliminando 99% dos conflitos.

---

## 🗺️ Plano de Ação (A Ordem das Tarefas)
Este é o nosso cronograma. É dividido em duas fases para evitar o caos.

### Fase 1: O Alicerce (Dono: Arnald)
* **Objetivo:** Preparar o projeto para TypeScript e Segurança.
* **Status:** ⛔ **NINGUÉM COMEÇA ATÉ O ARNALD TERMINAR ISTO.**
* **O que o Arnald vai fazer:**
    * Migrar o "coração" do app para TypeScript: `App.jsx`, `Layout.jsx`, `ProtectedRoute.jsx`, `dataService.js`, `firebase-config.js` -> `.tsx` / `.ts`.
    * Implementar o `firestore.rules` (as regras de segurança que planejamos).
    * Mesclar tudo na `feature/tp4-evolutiva`.
    * Avisar a equipe no WhatsApp/Discord: "Fase 1 CONCLUÍDA. Podem começar!"

### Fase 2: Trabalho Paralelo (Toda a Equipe)
* **Objetivo:** Todos trabalham ao mesmo tempo, em features isoladas.
* **O que TODOS (Nivaldo, João, Victor, Illgner) vão fazer:**
    * Pegar a base de TS do Arnald:
        ```bash
        git switch feature/tp4-evolutiva
        git pull origin feature/tp4-evolutiva
        ```
    * Criar sua própria branch:
        ```bash
        git switch -c [sua-branch-de-tarefa]
        ```
        (Ex: `git switch -c fix/quiz-teclado`)
    * Começar a trabalhar na sua tarefa (descrita abaixo).

---

## 💻 Tarefas Individuais (Fase 2)

### 👤 Arnald (Tech Lead)
* **Sua Tarefa:** Fase 1 (descrita acima) + ser o "Dono da Documentação".
* **Responsabilidade Extra:** Você não vai codar features na Fase 2. Seu trabalho será consolidar o `registro-das-implementação.md`.
* **Como Fazer:** À medida que a equipe mescla seus PRs, você vai puxar a `feature/tp4-evolutiva`, olhar o commit da feature (ex: `feat(dashboard): ...`), tirar os prints de "Antes e Depois" e escrever a seção dessa feature no `registro-das-implementação.md`.

### 👤 Nivaldo
* **Sua Tarefa:** ♿ Melhoria de Acessibilidade (A11y)
* **Branch:** `fix/quiz-teclado`
* **Arquivos que você vai mexer:** `CodigoFonte/src/pages/Quiz.tsx`.
* **Checklist:**
    * O Arnald já terá migrado este arquivo para `Quiz.tsx`. Se não, seu primeiro commit é: `refactor(quiz): Migra Quiz.jsx para TSX`.
    * Refatore o HTML: Mude os `<li>` das opções de resposta para elementos `<button>`.
    * Isso é tudo! O `<button>` já resolve nativamente a navegação por Tab e a ativação por Enter/Espaço.
    * Adicione um estilo de foco do Tailwind para o botão (ex: `focus:ring-2 focus:ring-purple-400`).
* **Documentação:** Avise o Arnald quando seu PR for mesclado, para que ele possa documentar no `registro-das-implementação.md`.

### 👤 João Victor
* **Sua Tarefa:** 🎨 Feature UI: "Palavra do Dia"
* **Branch:** `feat/palavra-do-dia`
* **Arquivos que você vai mexer:** `CodigoFonte/src/pages/DashBoard.tsx` e criar um hook.
* **Checklist:**
    * Seu primeiro commit: `refactor(dashboard): Migra DashBoard.jsx para TSX`.
    * Crie a pasta `CodigoFonte/src/features/dashboard/`.
    * Dentro dela, crie o arquivo `useWordOfDay.ts`. Este hook será responsável por chamar o `dataService` e buscar o termo aleatório.
    * No `DashBoard.tsx`, chame seu novo hook: `const { palavra, loading } = useWordOfDay();`
    * Crie o novo Card de UI no Dashboard para exibir a palavra.
* **Documentação:** Avise o Arnald quando seu PR for mesclado.

### 👤 Victor Gabriel
* **Sua Tarefa:** ⚖️ Feature Conformidade: Excluir Conta
* **Branch:** `feat/excluir-conta`
* **Arquivos que você vai mexer:** `CodigoFonte/src/pages/Perfil.tsx` e criar um hook.
* **Checklist:**
    * Seu primeiro commit: `refactor(perfil): Migra Perfil.jsx para TSX`.
    * Crie a pasta `CodigoFonte/src/features/profile/`.
    * Dentro dela, crie o arquivo `useDeleteAccount.ts`. Este hook deve exportar uma função `handleDeleteAccount` que chama o `dataService` para apagar o usuário.
    * No `Perfil.tsx`, adicione um "Botão de Perigo" (vermelho).
    * Ao clicar, mostre um Modal (pode ser um `alert()` simples, mas um modal é melhor) pedindo confirmação.
    * Se confirmado, chame a função do seu hook.
* **Documentação:** Avise o Arnald quando seu PR for mesclado.

### 👤 Illgner
* **Sua Tarefa:** 🧠 Feature Lógica: Repetição Espaçada (Base)
* **Branch:** `feat/repeticao-espacada`
* **Arquivos que você vai mexer:** `CodigoFonte/src/pages/Progresso.tsx` e criar um hook.
* **Checklist:**
    * Seu primeiro commit: `refactor(progresso): Migra Progresso.jsx para TSX`.
    * Crie a pasta `CodigoFonte/src/features/quiz/`.
    * Dentro dela, crie `useSpacedRepetition.ts`. Este hook deve chamar o `dataService` (que Arnald já migrou) e implementar a lógica que calcula quantos termos precisam de revisão.
    * No `Progresso.tsx`, chame seu novo hook: `const { termosParaRevisar } = useSpacedRepetition();`
    * Adicione um novo Card de UI na página de Progresso: "Você tem X termos para revisar hoje."
* **Documentação:** Avise o Arnald quando seu PR for mesclado.
