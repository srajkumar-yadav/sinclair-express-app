import { Joi } from 'express-validation';

const awardsValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
    }),
  },
  create: {
    body: Joi.object({
      user: Joi.number().integer().required(),
      sweepstake: Joi.number().integer().required(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      user: Joi.number().integer().required(),
      sweepstake: Joi.number().integer().required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      user: Joi.number().integer(),
      sweepstake: Joi.number().integer(),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { awardsValidation };
