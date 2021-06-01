const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Modelo do Laboratório no banco de dados

const LabSchema = new Schema(
  {
    name: { type: String, required: true },
    endereco: { type: String, required: true },
    status: { type: Boolean, required: true },
    exams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lab = mongoose.model('Lab', LabSchema);

module.exports = Lab;
