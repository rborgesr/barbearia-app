import { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../Dashboard.css';

function MeusAgendamentos() {
  const { user, logout } = useAuth();
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchAgendamentos = async () => {
      try {
        const res = await api.get(`servicos/cliente/${user.id}`);
        setAgendamentos(res.data);
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-content">
          <img src="/logo-barber.png" alt="Logo" className="logo" />
          <nav className="nav-links">
            <Link to={user ? "/home" : "/home"}>Home</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/agendamentos">Agendamentos</Link>
            <a href="#">Contato</a>
          </nav>
        </div>

        {/* Botões de Login/Sair/Cadastro */}
        {user ? (
          <button className="login-btn" onClick={handleLogout}>
            Sair
          </button>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/cadastro" className="register-btn">Cadastre-se</Link>
          </div>
        )}
      </header>

      {/* CONTEÚDO */}
      <div style={{ padding: '20px' }}>
        {!user ? (
          <div
            style={{
              minHeight: '60vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              backgroundColor: '#111',
              color: '#fff',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '400px',
              margin: '40px auto',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
              Faça login para ver seus agendamentos
            </h2>
            <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
              Você precisa estar autenticado para acessar esta área.
            </p>
            <Link
              to="/login"
              style={{
                backgroundColor: '#e11d48',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
              }}
            >
              Ir para Login
            </Link>
          </div>
        ) : loading ? (
          <p style={{ textAlign: 'center', color: '#fff' }}>Carregando agendamentos...</p>
        ) : (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>
              Meus Agendamentos
            </h2>
            {agendamentos.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#ccc' }}>Nenhum agendamento encontrado.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {agendamentos.map((a) => (
                  <li
                    key={a.id}
                    style={{
                      marginBottom: '12px',
                      padding: '12px',
                      border: '1px solid #e11d48',
                      borderRadius: '6px',
                      backgroundColor: '#1a1a1a',
                      color: '#eee',
                      fontSize: '0.9rem',
                    }}
                  >
                    <strong>Descrição:</strong> {a.descricao} <br />
                    <strong>Data:</strong> {a.data} <br />
                    <strong>Hora:</strong> {a.hora} <br />
                    <strong>Total:</strong> R$ {a.preco}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MeusAgendamentos;
