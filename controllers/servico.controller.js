const { db } = require('../firebase/firebase');
const { v4: uuidv4 } = require('uuid');

// Criação do serviço/agendamento
const criarServico = async (req, res) => {
  try {
    const { clienteId, nome, descricao, preco, data, hora, total } = req.body;

    console.log('Dados recebidos para criar serviço:', req.body);

    // Validação simples — evite salvar dados incompletos
    if (!clienteId || !nome || !descricao || !preco || !data || !hora || !total) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando no corpo da requisição' });
    }

    const id = uuidv4();
    await db.collection('servicos').doc(id).set({
      id,
      clienteId,
      nome,
      descricao,
      preco,
      data,
      hora,
      total,
      tipo: 'agendamento',
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'Agendamento/Serviço registrado com sucesso!' });
  } catch (err) {
    console.error('Erro no criarServico:', err);
    res.status(500).json({ error: 'Erro interno ao registrar serviço' });
  }
};


// Listar serviços
const listarServicos = async (_, res) => {
  try {
    const snapshot = await db.collection('servicos').get();
    const servicos = snapshot.docs.map(doc => doc.data());
    res.status(200).json(servicos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listarServicosPorCliente = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const snapshot = await db.collection('servicos').where('clienteId', '==', clienteId).get();

    if (snapshot.empty) {
      return res.status(200).json([]); // Sem agendamentos
    }

    const agendamentos = snapshot.docs.map(doc => doc.data());
    res.status(200).json(agendamentos);
  } catch (err) {
    console.error('Erro ao buscar agendamentos do cliente:', err);
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
};


// Atualizar serviço
const atualizarServico = async (req, res) => {
  try {
    await db.collection('servicos').doc(req.params.id).update(req.body);
    res.status(200).json({ message: 'Serviço atualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar serviço
const deletarServico = async (req, res) => {
  try {
    await db.collection('servicos').doc(req.params.id).delete();
    res.status(200).json({ message: 'Serviço deletado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listarServicosPorCliente, listarServicos, criarServico, atualizarServico, deletarServico };
