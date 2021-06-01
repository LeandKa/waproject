const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Modelo do Exame no banco de dados

const ExamSchema = new Schema(
  {
    name: { type: String, required: true },
    tipo: { type: String, required: true },
    status: { type: Boolean, required: true },
    labs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model('Exam', ExamSchema);

module.exports = Exam;
