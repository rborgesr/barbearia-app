import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import '../Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { user, token } = response.data;

      login(user);
      localStorage.setItem('password', token);
      alert('Login realizado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Email ou senha inválidos.');
    }
  };

  return (
    <div className="login-container">
      {/* Botão Voltar */}
      <button className="voltar-home-btn" onClick={() => navigate('/home')}>
        ⬅ Voltar
      </button>

      <form onSubmit={handleSubmit} className="login-form">
        <h2>ACESSE COM LOGIN E SENHA</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Login"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">LOGAR</button>
      </form>
    </div>
  );
}

export default Login;
