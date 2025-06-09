import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');  // redireciona para /home após logout
  };

  return (
    <nav>
      <Link to="/home">Home</Link> | 
      <Link to="/servicos">Serviços</Link> | 
      <Link to="/cadastro">Cadastre-se</Link> |
      <Link to="/agendamentos">Agendamentos</Link> | 
      <button onClick={handleLogout}>Sair</button>
    </nav>
  );
}

export default Navbar;
