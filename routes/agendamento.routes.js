const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamento.controller');

router.post('/', agendamentoController.criarAgendamento);
router.get('/', agendamentoController.todosAgendamentos); // ← alterado aqui
router.get('/usuario/:id', agendamentoController.agendamentosDoUsuario);
router.delete('/:id', agendamentoController.cancelarAgendamento);
//router.get('/agendamentos/usuario/:id', agendamentoController.agendamentosDoUsuario);


module.exports = router;
