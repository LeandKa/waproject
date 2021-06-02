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

// Routes
app.use(Lab, Exam);

app.listen(process.env.PORT || 4000);

module.exports = app;
