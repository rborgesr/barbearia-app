import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../Cadastro.css';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [regiaoInteresse, setRegiaoInteresse] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(null);

    if (senha !== confirmarSenha) {
      setMensagem('As senhas não conferem.');
      return;
    }

    try {
      const res = await api.post('/auth/register', {
        nome,
        email,
        telefone,
        senha,
      });

      setMensagem(res.data.message);
      setNome('');
      setEmail('');
      setTelefone('');
      setRegiaoInteresse('');
      setSenha('');
      setConfirmarSenha('');
    } catch (error) {
      if (error.response) {
        setMensagem(error.response.data.error || 'Erro ao cadastrar.');
      } else {
        setMensagem('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <div className="cadastro-container">
      {/* Botão Voltar */}
      <button className="voltar-home-btn" onClick={() => navigate('/home')}>
        ⬅ Voltar
      </button>

      <div className="cadastro-left">
        <h1>Cadastre-se</h1>
        <p>
          Lorem ipsum Lorem ipsum.Lorem ipsum.Lorem ipsum.Lorem ipsum.Lorem
          ipsum Lorem ipsum Lorem ipsum.
        </p>
      </div>

      <div className="cadastro-right">
        <form className="cadastro-form" onSubmit={handleSubmit}>
          {mensagem && <p className="mensagem">{mensagem}</p>}

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <div className="cadastro-row">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Região de Interesse"
            value={regiaoInteresse}
            onChange={(e) => setRegiaoInteresse(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength={6}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <button type="submit">CADASTRE-SE</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
