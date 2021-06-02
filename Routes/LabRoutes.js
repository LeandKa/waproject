const express = require('express');

const router = express.Router();

const labController = require('../Controllers/LabController.js');

// Criação/Remoção/Atualização em lote

router.get('/api/create/batch/lab', labController.batchLab);
router.put('/api/update/batch/lab', labController.batchUpdateLab);
router.delete('/api/delete/batch/lab', labController.batchLabDelete);

// Adição e Remoção em lote de Exames em Laboratórios baseado no id do Laboratório
router.put('/api/add/batch-exam', labController.batchLabUpdateAddExam);
router.put('/api/remove/batch-exam', labController.batchLabUpdateRemoveExam);

// Retorno de todos os Laboratorios ativos
router.get('/lab', labController.getLab);

// Retorna um Laboratório especifico
router.get('/api/get/lab?:id', labController.getLabOne);

// Criação/Remoção/Atualização
router.post('/api/create/lab', labController.createLab);
router.put('/api/update/lab?:id', labController.updateLab);
router.delete('/api/remove/lab?:id', labController.removeLab);

// Update o status do laboratório
router.put('/api/update/status/lab?:id', labController.updateStatusLab);

// Adição e Remoção da associação de um laboratório ativo e exame ativo

router.put('/api/add/exam', labController.addExam);
router.put('/api/remove/exam', labController.removeExam);

module.exports = router;
