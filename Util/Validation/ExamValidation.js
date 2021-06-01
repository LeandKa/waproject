const Joi = require('joi');

// Validação do body da requisição usando joi

const scheme = Joi.object({
  name: Joi.string().required().min(3).messages({
    'string.base': `name deve ser do tipo texto`,
    'string.empty': `name não pode ser vazio`,
    'string.min': `name deve ter um tamanho minino de {#limit}`,
    'any.required': `name não pode ser nulo`,
  }),
  tipo: Joi.string().required().messages({
    'string.base': `tipo deve ser do tipo texto`,
    'string.empty': `tipo não pode ser vazio`,
    'any.required': `endereco não pode ser nulo`,
  }),
});

module.exports = scheme;
