const express = require('express');

const router = express.Router();
const ExamController = require('../Controllers/ExamController');

// Controle global de erro
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Criação/Remoção/Atualização em lote
router.get('/api/create/batch/exams', use(ExamController.batchExam));
router.put('/api/update/batch/exams', use(ExamController.BatchUpdateExam));
router.delete('/api/delete/batch/exams', use(ExamController.BatchDeleteExam));

// Criação/Remoção/Atualização
router.post('/api/create/exam', use(ExamController.createExam));
router.delete('/api/delete/exam?:id', use(ExamController.removeExam));
router.put('/api/update/exam?:id', use(ExamController.updateExam));

// Retorna todos os exames ativos
router.get('/api/get/examsActive', use(ExamController.getExams));

// Retorna apenas um Exame especifico
router.get('/api/get/exams?:id', use(ExamController.getExamOne));

// Update o status do exame
router.put('/api/update/status/exam?:id', use(ExamController.updateStatusExam));

// Retorna todos os laboratórios que possum o nome requerido
router.get('/api/get/examLabs?:name', use(ExamController.getLabByExamsName));

module.exports = router;
