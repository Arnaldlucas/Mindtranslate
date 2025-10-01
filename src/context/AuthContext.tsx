import React, { createContext, useEffect, useState, ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile, // 1. Importe a função 'updateProfile'
  UserCredential,
  User,
} from "firebase/auth";
import { auth, db } from "../pages/firebase-config";
import { doc, setDoc } from "firebase/firestore";

// Interface que define a "forma" do nosso contexto para o TypeScript
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// Valor padrão seguro para o contexto
const defaultAuthContextValue: AuthContextType = {
  currentUser: null,
  loading: true,
  login: () => Promise.reject(new Error("Função login não inicializada")),
  register: () => Promise.reject(new Error("Função register não inicializada")),
  logout: () => Promise.reject(new Error("Função logout não inicializada")),
};

export const AuthContext = createContext<AuthContextType>(
  defaultAuthContextValue
);

// Tipo para as props do nosso Provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Registra um novo usuário, atualiza seu perfil de autenticação com o nome
   * e cria um documento de perfil correspondente no Firestore.
   *
   * @param name O nome completo do usuário.
   * @param email O e-mail para o registro.
   * @param password A senha para a nova conta.
   * @returns Uma Promessa que resolve com as credenciais do usuário.
   */
  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<UserCredential> {
    try {
      // Passo 1: Cria o usuário no serviço de Autenticação
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2. CORREÇÃO: Atualiza o perfil de autenticação com o nome fornecido
      await updateProfile(user, {
        displayName: name,
      });

      // Passo 3: Cria o documento de perfil no Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      return userCredential;
    } catch (error) {
      console.error("Erro detalhado no registro (AuthContext):", error);
      throw error;
    }
  }

  function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout(): Promise<void> {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
