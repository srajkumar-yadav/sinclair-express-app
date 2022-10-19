import { Joi } from 'express-validation';

const userValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      username: Joi.string().max(255),
      email: Joi.string().max(255),
      walletIndex: Joi.number().integer(),
      walletId: Joi.string().max(255),
    }),
  },
  create: {
    body: Joi.object({
      username: Joi.string().max(255),
      email: Joi.string().max(255),
      walletIndex: Joi.number().integer(),
      walletId: Joi.string().max(255),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      username: Joi.string().max(255).required(),
      email: Joi.string().max(255).required(),
      walletIndex: Joi.number().integer().required(),
      walletId: Joi.string().max(255).required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      username: Joi.string().max(255),
      email: Joi.string().max(255),
      walletIndex: Joi.number().integer(),
      walletId: Joi.string().max(255),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { userValidation };
