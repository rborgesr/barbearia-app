import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';  // Importa Link
import '../Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');  // logout leva para a página pública inicio
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <img src="/logo-barber.png" alt="Logo" className="logo" />
          <nav className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/agendamentos">Agendamentos</Link>
            <a href="/contato">Contato</a>
          </nav>
        </div>

        {/* Botões de Login/Sair/Cadastro */}
        {user ? (
          <button onClick={handleLogout} className="login-btn">
            Sair
          </button>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/cadastro" className="register-btn">
              Cadastre-se
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-img-container">
          <img src="/barbearia.jpeg" alt="Barbearia" className="hero-img" />
        </div>
        <div className="hero-text">
          <h1>
            Seu Barbeiro
            <br />
            Preferido Lorem
          </h1>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section className="servicos-section">
        <h2>Nossos Serviços</h2>
        <div className="linha-vermelha"></div>

        <div className="servico-lista">
          {[
            { nome: 'Disfarçado', preco: 'R$ 25,00', icone: '🪒' },
            { nome: 'Barba', preco: 'R$ 20,00', icone: '🧔' },
            { nome: 'Corte Tesoura', preco: 'R$ 25,00', icone: '✂️' },
            { nome: 'Sobrancelha', preco: 'R$ 15,00', icone: '👁️' },
            { nome: 'Platinado', preco: 'R$ 100,00', icone: '💈' },
          ].map((servico, idx) => (
            <div className="servico-card" key={idx}>
              <div className="servico-icone">{servico.icone}</div>
              <h3 style={{ letterSpacing: '1px' }}>{servico.nome}</h3>
              <p>{servico.preco}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
