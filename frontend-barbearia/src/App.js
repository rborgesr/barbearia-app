import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Servicos from './pages/Servicos';
import Agendamentos from './pages/Agendamentos';
import { useAuth } from './context/AuthContext';
import Cadastro from './pages/Cadastro';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* redireciona raiz para /inicio */}
        <Route path="/" element={<Navigate to="/home" replace />} />


        <Route path="/home" element={<Dashboard />} />
        <Route path="/login" element={user ? <Dashboard /> : <Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
      </Routes>
    </Router>
  );
}

export default App;
