const express = require('express');

const router = express.Router();

const labController = require('../Controllers/LabController.js');

// Controle global de erro
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Criação/Remoção/Atualização em lote

router.get('/api/create/batch/lab', use(labController.batchLab));
router.put('/api/update/batch/lab', use(labController.batchUpdateLab));
router.delete('/api/delete/batch/lab', use(labController.batchLabDelete));

// Adição e Remoção em lote de Exames em Laboratórios baseado no id do Laboratório
router.put('/api/add/batch-exam', use(labController.batchLabUpdateAddExam));
router.put(
  '/api/remove/batch-exam',
  use(labController.batchLabUpdateRemoveExam)
);

// Retorno de todos os Laboratorios ativos
router.get('/api/get/labs-active', use(labController.getLab));

// Retorna um Laboratório especifico
router.get('/api/get/lab?:id', use(labController.getLabOne));

// Criação/Remoção/Atualização
router.post('/api/create/lab', use(labController.createLab));
router.put('/api/update/lab?:id', use(labController.updateLab));
router.delete('/api/remove/lab?:id', use(labController.removeLab));

// Update o status do laboratório
router.put('/api/update/status/lab?:id', use(labController.updateStatusLab));

// Adição e Remoção da associação de um laboratório ativo e exame ativo

router.put('/api/add/exam', use(labController.addExam));
router.put('/api/remove/exam', use(labController.removeExam));

module.exports = router;
