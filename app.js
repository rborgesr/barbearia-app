const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth.routes');
const servicoRoutes = require('./routes/servico.routes');
const agendamentoRoutes = require('./routes/agendamento.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

app.get('/', (req, res) => {
  res.send('API da Barbearia está funcionando!');
});


module.exports = app;
