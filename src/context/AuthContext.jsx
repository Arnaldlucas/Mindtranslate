// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Defina a URL base do seu backend aqui
const API_BASE_URL = 'http://localhost:5000/api/auth'; // A porta do seu backend

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Em uma aplicação real, você faria uma requisição para uma rota de validação
            // no backend para verificar se o token ainda é válido e obter dados do usuário.
            // Por simplicidade aqui, apenas setamos um usuário com base na existência do token.
            // Idealmente, você decodificaria o token aqui para obter user.name e user.email
            // Exemplo (usando uma lib como 'jwt-decode' - npm install jwt-decode):
            // import jwt_decode from 'jwt-decode';
            // const decodedUser = jwt_decode(token);
            // setUser(decodedUser.user);
            setUser({ token: token }); // Se não usar jwt-decode, ao menos saiba que há um token
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            const { token, user: userData } = response.data;
            localStorage.setItem('token', token);
            setUser(userData); // Define os dados do usuário no contexto
            navigate('/dashboard'); // Redireciona após login bem-sucedido
            return true;
        } catch (error) {
            console.error('Erro no login:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
            alert(response.data.message || 'Registro bem-sucedido! Agora faça login.');
            navigate('/login'); // Redireciona para a página de login após o registro
            return true;
        } catch (error) {
            console.error('Erro no registro:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Erro ao registrar. Email já em uso?');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);