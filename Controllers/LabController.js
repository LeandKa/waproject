const Lab = require('../Models/LabModel');
const Exam = require('../Models/ExamModel');

const schema = require('../Util/Validation/LabValidation');

// Adição de laboratório em lote
const batchLab = async (req, res) => {
  const labs = req.body;
  const LabsMulti = await Lab.insertMany(labs);
  if (LabsMulti) {
    return res.status(201).send(LabsMulti);
  } else {
    throw { message: 'Algum erro ocorreu com a sua criação multipla' };
  }
};
// Update de Laboratório em lote
const batchUpdateLab = async (req, res) => {
  const labs = req.body;
  const exp = await Promise.allSettled(
    labs.map(async (lab) => {
      const content = await Lab.findByIdAndUpdate(
        { _id: lab._id },
        { name: lab.name, endereco: lab.endereco, status: lab.status }
      );
      return content;
    })
  );
  return res.status(202).send(exp);
};

// Associa um laboratório a um exame ativo
const batchLabUpdateAddExam = async (req, res) => {
  const { idLab, idsExam } = req.body;
  const labs = await Exam.find({ _id: idsExam });
  if (!labs) {
    throw { message: 'Entre as Ids de exames passadas algumas não existem ' };
  }
  const LabsMulti = await Lab.updateMany(
    { _id: idLab },
    { $addToSet: { exams: idsExam } }
  );
  if (LabsMulti) {
    const exp = await Promise.allSettled(
      idsExam.map(async (exam) => {
        const content = await Exam.findByIdAndUpdate(
          { _id: exam },
          { $addToSet: { labs: idLab } }
        );
        return content;
      })
    );
    if (exp) {
      return res.status(202).send(exp);
    }
  } else {
    throw { message: 'Algum erro ocorreu com a sua atualização multipla' };
  }
};

// Desassocia um exame ativo a um laboratório ativo
const batchLabUpdateRemoveExam = async (req, res) => {
  const { idLab, idsExam } = req.body;
  const labs = await Exam.find({ _id: idsExam });
  if (!labs) {
    throw { message: 'Entre as Ids de exames passadas algumas não existem ' };
  }
  const LabsMulti = await Lab.findByIdAndUpdate(
    { _id: idLab },
    { $pullAll: { exams: idsExam } }
  );
  if (LabsMulti) {
    const exp = await Promise.allSettled(
      idsExam.map(async (exam) => {
        const content = await Exam.findByIdAndUpdate(
          { _id: exam },
          { $pull: { labs: idLab } }
        );
        return content;
      })
    );
    if (exp) {
      return res.status(202).send(exp);
    }
  } else {
    throw { message: 'Algum erro ocorreu com a sua atualização multipla' };
  }
};

// Deleta um laboratório ativo em lote
const batchLabDelete = async (req, res) => {
  const ids = req.body;
  const exp = await Promise.allSettled(
    ids.map(async (lab) => {
      const content = await Lab.findOne({ _id: lab });
      const BatchExamsId = content.exams.map((up) => {
        return up._id;
      });

      if (BatchExamsId) {
        const ExamUpdate = await Exam.updateMany(
          { _id: BatchExamsId },
          { $pull: { labs: lab } }
        );
        if (ExamUpdate) {
          const delLab = await Lab.findOneAndDelete({ _id: lab });
          return delLab;
        }
      }
    })
  );
  return res.status(200).send(exp);
};

// Cria um laboratório
const createLab = async (req, res) => {
  const { name, endereco } = req.body;
  const { error, value } = await schema.validateAsync(req.body);
  if (error) {
    throw { message: value };
  } else {
    const labSearch = await Lab.find({ endereco });
    if (labSearch.length === 0) {
      const labSample = new Lab({ name, endereco, status: true });
      await labSample.save();
      return res.status(200).send(labSample);
    } else {
      throw { message: 'Um Laboratório com esse endereço ja esta cadastrado' };
    }
  }
};

// Retorna todos os laboratórios
const getLab = async (req, res) => {
  const labs = await Lab.find({ status: true }).populate({
    path: 'exams',
    match: { status: true }, // Retorna todos os exames associados ao laboratório
  });
  if (labs) {
    return res.status(202).send(labs);
  } else {
    throw { message: 'Algo deu errado com a busca' };
  }
};

// Retorna um laboratório com base no seu id
const getLabOne = async (req, res) => {
  const { id } = req.query;
  const labs = await Lab.find({ _id: id }).populate({
    path: 'exams',
    match: { status: true }, // Retorna todos os exames que esta associado a esse laboratório
  });
  if (labs) {
    return res.status(202).send(labs);
  } else {
    throw { message: 'Algo deu errado com a busca' };
  }
};

// Update um laboratório
const updateLab = async (req, res) => {
  const { id } = req.query;
  const { name, endereco } = req.body;
  const lab = await Lab.findOne({ _id: id });
  const labNameFilter = await Lab.findOne({ name });
  if (!lab) {
    throw { message: 'Nenhum Laboratório com essa id' };
  } else {
    if (!labNameFilter) {
      await lab.updateOne({
        $set: {
          name: name || lab.name,
          endereco: endereco || lab.endereco,
          status: lab.status,
        },
      });
      const updateLab = await Lab.findOne({ _id: id });
      return res.status(202).send(updateLab);
    } else {
      throw { message: 'Nome já cadastrado escolha outro ' };
    }
  }
};

// Update do status do laboratório
const updateStatusLab = async (req, res) => {
  const { id } = req.query;
  const lab = await Lab.findOne({ _id: id });
  if (!lab) {
    throw { message: 'Nenhum Laboratório com essa id' };
  }
  await lab.updateOne({
    $set: {
      status: !lab.status,
    },
  });
  const updateLab = await Lab.findOne({ _id: id });
  return res.status(202).send(updateLab);
};

// Remove o laboratório
const removeLab = async (req, res) => {
  const { id } = req.query;
  const labSearch = await Lab.findOne({ _id: id });
  const BatchLabId = labSearch.exams.map((up) => {
    return up._id;
  });
  if (BatchLabId) {
    const ExamUpdate = await Exam.updateMany(
      { _id: BatchLabId },
      { $pull: { labs: id } }
    );
    if (ExamUpdate) {
      const delLab = await Lab.findOneAndDelete({ _id: id });
      return res.status(200).send(delLab);
    }
  } else {
    throw { message: 'Id de Laboratório não achado' };
  }
};

// Associa um exame ativo a um laboratório ativo
const addExam = async (req, res) => {
  const { idExam, idLab } = req.body;
  const examSearch = await Exam.findOne({ _id: idExam, status: true });
  if (examSearch) {
    const LabSearch = await Lab.findOneAndUpdate(
      { _id: idLab, status: true },
      {
        $addToSet: { exams: idExam },
      }
    );
    if (LabSearch) {
      await examSearch.updateOne({
        $addToSet: { labs: idLab },
      });
      const searchShow = await Lab.findOne({ _id: LabSearch._id });
      return res.status(202).send(searchShow);
    } else {
      throw { message: 'Laboratório não encontrado ou não esta ativo' };
    }
  } else {
    throw { message: 'Exame não encontrado ou não esta ativo' };
  }
};

// Desassocia um exame ativo a um laboratório ativo
const removeExam = async (req, res) => {
  const { idExam, idLab } = req.body;
  const examSearch = await Exam.findOne({ _id: idExam });
  if (examSearch) {
    const LabSearch = await Lab.findByIdAndUpdate(idLab, {
      $pull: { exams: examSearch._id },
    });
    if (LabSearch) {
      await examSearch.updateOne({
        $pull: { labs: examSearch._id },
      });
      const searchShow = await Lab.findOne({ _id: LabSearch._id });
      return res.status(202).send(searchShow);
    } else {
      throw { message: 'Laboratório não encontrado' };
    }
  } else {
    throw { message: 'Exame não encontrado' };
  }
};

module.exports = {
  batchLab,
  batchLabUpdateAddExam,
  batchLabUpdateRemoveExam,
  batchLabDelete,
  batchUpdateLab,
  getLab,
  getLabOne,
  createLab,
  updateLab,
  removeLab,
  updateStatusLab,
  addExam,
  removeExam,
};
