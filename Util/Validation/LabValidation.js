const Joi = require('joi');

// Validação do body da requisição usando joi

const scheme = Joi.object({
  name: Joi.string().required().min(3).messages({
    'string.base': `name deve ser do tipo texto`,
    'string.empty': `name não pode ser vazio`,
    'string.min': `name deve ter um tamanho minino de {#limit}`,
    'any.required': `name não pode ser nulo`,
  }),
  endereco: Joi.string().required().min(10).messages({
    'string.base': `endereco deve ser do tipo texto`,
    'string.empty': `endereco não pode ser vazio`,
    'string.min': `endereco deve ter um tamanho minino de {#limit}`,
    'any.required': `endereco não pode ser nulo`,
  }),
});

module.exports = scheme;
