require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const { Lab, Exam } = require('./Routes/index');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Banco de dados
mongoose.connect(process.env.DB_HOST || 'URI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());

// Middleware responsavel por tratar as exceptions
app.use(function (err, req, res, next) {
  return res.status(400).send({ message: err.message });
});

// Routes
app.use(Lab, Exam);

app.listen(process.env.PORT || 4000);

module.exports = app;
