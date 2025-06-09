const { db } = require('../firebase/firebase');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const criarAgendamento = async (req, res) => {
  const { clienteId, servicoId, barbeiroId, data, hora } = req.body;

  const horaAgendada = await db.collection('agendamentos')
    .where('data', '==', data)
    .where('hora', '==', hora)
    .get();

  if (!horaAgendada.empty) return res.status(400).json({ error: 'Horário já reservado' });

  try {
    const id = uuidv4();
    await db.collection('agendamentos').doc(id).set({
      id, clienteId, servicoId, barbeiroId, data, hora, status: 'ativo'
    });
    res.status(201).json({ message: 'Agendamento criado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const agendamentosDoUsuario = async (req, res) => {
  const { id } = req.params;
  const snapshot = await db.collection('agendamentos').where('clienteId', '==', id).get();
  const dados = snapshot.docs.map(doc => doc.data());
  res.status(200).json(dados);
};

const todosAgendamentos = async (_, res) => {
  const snapshot = await db.collection('agendamentos').get();
  const dados = snapshot.docs.map(doc => doc.data());
  res.status(200).json(dados);
};

const cancelarAgendamento = async (req, res) => {
  const { id } = req.params;

  const doc = await db.collection('agendamentos').doc(id).get();
  if (!doc.exists) return res.status(404).json({ error: 'Agendamento não encontrado' });

  const { data, hora } = doc.data();
  const horaAgendada = moment(`${data} ${hora}`, 'YYYY-MM-DD HH:mm');
  const agora = moment();

  const diffHoras = horaAgendada.diff(agora, 'hours');
  if (diffHoras < process.env.CANCELAMENTO_HORAS_ANTECEDENCIA)
    return res.status(400).json({ error: 'Cancelamento fora do prazo permitido' });

  await db.collection('agendamentos').doc(id).update({ status: 'cancelado' });
  res.status(200).json({ message: 'Agendamento cancelado' });
};

module.exports = {
  criarAgendamento,
  agendamentosDoUsuario,
  todosAgendamentos,
  cancelarAgendamento
};
