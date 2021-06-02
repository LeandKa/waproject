const express = require('express');

const router = express.Router();
const ExamController = require('../Controllers/ExamController');

// Criação/Remoção/Atualização em lote
router.get('/api/create/batch/exams', ExamController.batchExam);
router.put('/api/update/batch/exams', ExamController.BatchUpdateExam);
router.delete('/api/delete/batch/exams', ExamController.BatchDeleteExam);

// Criação/Remoção/Atualização
router.post('/api/create/exam', ExamController.createExam);
router.delete('/api/delete/exam?:id', ExamController.removeExam);
router.put('/api/update/exam?:id', ExamController.updateExam);

// Retorna todos os exames ativos
router.get('/exam', ExamController.getExams);

// Retorna apenas um Exame especifico
router.get('/api/get/exams?:id', ExamController.getExamOne);

// Update o status do exame
router.put('/api/update/status/exam?:id', ExamController.updateStatusExam);

// Retorna todos os laboratórios que possum o nome requerido
router.get('/api/get/examLabs?:name', ExamController.getLabByExamsName);

module.exports = router;
