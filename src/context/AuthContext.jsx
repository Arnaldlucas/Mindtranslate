import React, { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../pages/firebase-config";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // A CORREÇÃO ESTÁ AQUI:
  // 1. A função 'register' agora é declarada como 'async'.
  async function register(name, email, password) {
    try {
      // 2. O 'new Promise' foi removido. Usamos try/catch diretamente.
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      // 3. Ao retornar um valor em uma função async, a Promise implícita é resolvida com esse valor.
      return userCredential;
    } catch (error) {
      // 4. Ao lançar um erro, a Promise implícita é rejeitada com esse erro.
      // Isso permite que o componente que chamou 'register' use seu próprio bloco catch.
      console.error("Erro detalhado no registro (AuthContext):", error);
      throw error;
    }
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(
        "AUTH_CONTEXT: Listener do Firebase disparou. Novo estado do usuário:",
        user
      );
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}