import { Joi } from 'express-validation';

const sweepStakeValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      startDate: Joi.date(),
      endDate: Joi.date(),
      status: Joi.string().max(255),
      type: Joi.string().max(255),
      totalTickets: Joi.number().integer(),
    }),
  },
  create: {
    body: Joi.object({
      startDate: Joi.date(),
      endDate: Joi.date(),
      status: Joi.string().max(255),
      type: Joi.string().max(255),
      totalTickets: Joi.number().integer(),
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
      type: Joi.string().max(255).required(),
      totalTickets: Joi.number().integer().required(),
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
      type: Joi.string().max(255),
      totalTickets: Joi.number().integer(),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { sweepStakeValidation };
