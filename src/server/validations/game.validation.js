import { Joi } from 'express-validation';

const gameValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      startDate: Joi.date(),
      endDate: Joi.date(),
      status: Joi.string().max(255),
    }),
  },
  create: {
    body: Joi.object({
      startDate: Joi.date(),
      endDate: Joi.date(),
      status: Joi.string().max(255),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      status: Joi.string().max(255).required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      startDate: Joi.date(),
      endDate: Joi.date(),
      status: Joi.string().max(255),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { gameValidation };
