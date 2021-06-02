const Exam = require('../Models/ExamModel');
const schema = require('../Util/Validation/ExamValidation');
const Lab = require('../Models/LabModel');

// Adição de exame em lote
const batchExam = async (req, res) => {
  try {
    const exams = req.body;
    const ExamsMulti = await Exam.insertMany(exams);
    if (ExamsMulti) {
      return res.status(201).send(ExamsMulti);
    } else {
      throw { message: 'Algo acontenceu com a sua requisição', status: 500 };
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

// Update em lote de exame
const BatchUpdateExam = async (req, res) => {
  try {
    const exams = req.body;
    const exp = await Promise.allSettled(
      exams.map(async (exam) => {
        const content = await Exam.findByIdAndUpdate(
          { _id: exam._id },
          { name: exam.name, tipo: exam.tipo, status: exam.status }
        );
        return content;
      })
    );
    if (exp) {
      return res.status(202).send(exp);
    } else {
      throw { message: 'Algo acontenceu com a sua requisição', status: 500 };
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

// Remoção em lote de exame

const BatchDeleteExam = async (req, res) => {
  try {
    const ids = req.body;
    const exp = await Promise.allSettled(
      ids.map(async (exam) => {
        const content = await Exam.findOne({ _id: exam });
        const BatchLabId = content.labs.map((up) => {
          return up._id;
        });

        if (BatchLabId) {
          const LabUpdate = await Lab.updateMany(
            { _id: BatchLabId },
            { $pull: { exams: exam } }
          );
          if (LabUpdate) {
            const delExam = await Exam.findOneAndDelete({ _id: exam });
            return delExam;
          }
        }
      })
    );
    if (exp) {
      return res.status(200).send(exp);
    } else {
      throw { message: 'Algo acontenceu com a sua requisição', status: 400 };
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

// Criação de um exame
const createExam = async (req, res) => {
  try {
    const { name, tipo } = req.body;
    const { error, value } = await schema.validateAsync(req.body); // Validação do body usando o modelo do Joi
    if (error) {
      throw { message: value, status: 404 };
    } else {
      const ExamSearch = await Exam.find({ name });
      if (ExamSearch.length === 0) {
        const examSample = new Exam({
          name,
          tipo,
          status: true,
        });
        await examSample.save();
        return res.status(200).send(examSample);
      } else {
        throw { message: 'Exame com esse nome ja cadastrado', status: 400 };
      }
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

// Retorna todos os exames
const getExams = async (req, res) => {
  try {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    const exams = await Exam.find({ status: true })
      .populate({
        path: 'labs',
        match: { status: true }, // retorna todos os laboratórios que estão dentro do exames
      })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);
    if (exams) {
      return res.status(202).send({ exams: exams, pageOptions: pageOptions });
    } else {
      throw { message: 'Algo acontenceu com a sua requisição', status: 500 };
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

// Retorna um Laboratório baseado no seu id
const getExamOne = async (req, res) => {
  try {
    const { id } = req.query;
    const exams = await Exam.find({ _id: id }).populate({
      path: 'exams', // retorna todos os laboratórios que estão dentro do exames
      match: { status: true },
    });
    if (exams) {
      return res.status(202).send(exams);
    } else {
      throw { message: 'Exame com essa id nao encontrado', status: 404 };
    }
  } catch (error) {
    return res.status(error.message).send(error.message);
  }
};

// Update de um Exame tendo como referência o seu id
const updateExam = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, tipo } = req.body;
    const exam = await Exam.findOne({ _id: id });
    const examNameFilter = await Exam.findOne({ name });
    if (!exam) {
      throw { message: 'Nenhum exame com essa id', status: 404 };
    } else {
      if (!examNameFilter) {
        await exam.updateOne({
          $set: {
            name: name || exam.name,
            tipo: tipo || exam.endereco,
            status: exam.status,
          },
        });
        const updateExam = await Exam.findOne({ _id: id });
        return res.status(202).send(updateExam);
      } else {
        throw { message: 'Nome já cadastrado escolha outro ', status: 400 };
      }
    }
  } catch (error) {
    return res.status(error.message).send(error.message);
  }
};

// Troca os status do exame
const updateStatusExam = async (req, res) => {
  try {
    const { id } = req.query;
    const exam = await Exam.findOne({ _id: id });
    if (!exam) {
      throw { message: 'Nenhum Exame com essa id', status: 404 };
    }
    await exam.updateOne({
      $set: {
        status: !exam.status,
      },
    });
    const updateExam = await Exam.findOne({ _id: id });
    if (!updateExam) {
      throw { message: 'Algo acontenceu com a sua requisição', status: 500 };
    }
    return res.status(202).send(updateExam);
  } catch (error) {
    return res.status(error.message).send(error.message);
  }
};

// Remove um exame tendo como referencia o seu id
const removeExam = async (req, res) => {
  try {
    const { id } = req.query;
    const examSearch = await Exam.findOne({ _id: id });
    const BatchLabId = examSearch.labs.map((up) => {
      return up._id;
    });
    if (BatchLabId) {
      const LabUpdate = await Lab.updateMany(
        { _id: BatchLabId },
        { $pull: { exams: id } }
      );
      if (LabUpdate) {
        const delExam = await Exam.findOneAndDelete({ _id: id });
        return res.status(200).send(delExam);
      }
    } else {
      throw { message: 'Erro ao remover', status: 500 };
    }
  } catch (error) {
    return res.status(error.message).send(error.message);
  }
};

// Retorna os laboratórios que estão associados ao exame que e buscado atraves do seu nome
const getLabByExamsName = async (req, res) => {
  try {
    const { name } = req.query;
    const examSearch = await Exam.findOne({ name: name }).populate({
      path: 'labs',
      match: { status: true },
    });
    if (examSearch) {
      return res.status(202).send(examSearch);
    } else {
      throw { message: 'Nenhum exame encontrado com esse nome', status: 404 };
    }
  } catch (error) {
    return res.status(error.message).send(error.message);
  }
};

module.exports = {
  batchExam,
  BatchUpdateExam,
  BatchDeleteExam,
  createExam,
  getExams,
  getExamOne,
  updateExam,
  updateStatusExam,
  removeExam,
  getLabByExamsName,
};
