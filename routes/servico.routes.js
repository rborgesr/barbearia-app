const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servico.controller');
//const verifyToken = require('../middlewares/auth.middleware'); // 🔧 <- Adicione isso

// Definindo as rotas de serviços
router.get('/', servicoController.listarServicos);  // Chama a função listarServicos
router.post('/', servicoController.criarServico);  // Chama a função criarServico
router.put('/:id', servicoController.atualizarServico);  // Chama a função atualizarServico
router.delete('/:id', servicoController.deletarServico);  // Chama a função deletarServico
router.get('/cliente/:clienteId', servicoController.listarServicosPorCliente);



//router.post('/servicos', verifyToken, servicoController.criarServico);


module.exports = router;
