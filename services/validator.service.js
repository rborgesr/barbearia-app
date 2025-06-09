import React, { useEffect, useState } from 'react';
import api from './api'; // importe o arquivo api.js

function Servicos() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    api.get('/servicos')  // já vai para http://localhost:3001/api/servicos
      .then(response => setServicos(response.data))
      .catch(error => console.error('Erro na API:', error));
  }, []);

  return (
    <div>
      <h2>Serviços</h2>
      <ul>
        {servicos.map(servico => (
          <li key={servico.id}>{servico.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default Servicos;
