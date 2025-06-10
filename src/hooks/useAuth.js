import { useContext } from 'react';
// Importa o Contexto que será exportado do nosso arquivo AuthContext
import { AuthContext } from '../context/AuthContext'; 

export const useAuth = () => {
  return useContext(AuthContext);
};