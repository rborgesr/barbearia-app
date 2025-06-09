import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../Services.css';
import '../Dashboard.css';  // Importa o CSS para os botões login e cadastre-se

const servicosFixos = [
  { id: 1, nome: 'Disfarçado', preco: 25 },
  { id: 2, nome: 'Barba', preco: 20 },
  { id: 3, nome: 'Corte Tesoura', preco: 25 },
  { id: 4, nome: 'Sobrancelha', preco: 15 },
  { id: 5, nome: 'Platinado', preco: 100 },
];

function Servicos() {
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const toggleServico = (servico) => {
    const jaSelecionado = servicosSelecionados.some((s) => s.id === servico.id);
    let novosServicos;

    if (jaSelecionado) {
      novosServicos = servicosSelecionados.filter((s) => s.id !== servico.id);
    } else {
      novosServicos = [...servicosSelecionados, servico];
    }

    setServicosSelecionados(novosServicos);
    setTotal(novosServicos.reduce((acc, s) => acc + s.preco, 0));
  };

  const agendar = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert('Favor realizar login para agendar serviço');
      return;
    }

    if (servicosSelecionados.length === 0 || !data || !hora) {
      alert('Selecione pelo menos um serviço, data e horário!');
      return;
    }

    const nomes = servicosSelecionados.map((s) => s.nome).join(', ');
    const descricao = `Serviços: ${nomes}`;

    try {
      setLoading(true);

      await api.post('/servicos', {
        clienteId: user.id,
        nome: 'Agendamento',
        descricao,
        preco: total,
        data,
        hora,
        total
      });

      alert('Agendamento registrado com sucesso!');
      setServicosSelecionados([]);
      setData('');
      setHora('');
      setTotal(0);
    } catch (error) {
      console.error('Erro ao registrar agendamento:', error);
      alert('Erro ao registrar agendamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <img src="/logo-barber.png" alt="Logo" className="logo" />
          <nav className="nav-links">
            <a href="/home">Home</a>
            <a href="/servicos">Serviços</a>
            <a href="/agendamentos">Agendamentos</a>
            <a href="#">Contato</a>
          </nav>
        </div>

        {user ? (
          <button onClick={handleLogout} className="login-btn">Sair</button>
        ) : (
          <div className="auth-buttons">
            <a href="/login" className="login-btn">Login</a>
            <a href="/cadastro" className="register-btn">Cadastre-se</a>
          </div>
        )}
      </header>

      <h2>Escolha Os Serviços Desejados</h2>

      <form onSubmit={agendar}>
        <div className="servicos-grid">
          {servicosFixos.map((servico) => {
            const selecionado = servicosSelecionados.some((s) => s.id === servico.id);
            return (
              <div
                key={servico.id}
                className={`servico-card ${selecionado ? 'selected' : ''}`}
                onClick={() => toggleServico(servico)}
              >
                <img
                  src={`/icons/${servico.nome.toLowerCase().replace(' ', '-')}.png`}
                  alt={servico.nome}
                />
                <div>{servico.nome}</div>
                <span>R$ {servico.preco.toFixed(2)}</span>
              </div>
            );
          })}
        </div>

        <div className="agendamento-inputs">
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
          <div className="total-container">TOTAL: R$ {total.toFixed(2)}</div>
          <button type="submit" className="agendar-btn" disabled={loading}>
            {loading ? 'Agendando...' : 'AGENDAR'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Servicos;
