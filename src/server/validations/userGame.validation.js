import { Joi } from 'express-validation';

const userGameValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      type: Joi.string().max(255),
      status: Joi.string().max(255),
    }),
  },
  create: {
    body: Joi.object({
      user: Joi.number().integer().required(),
      gamesweepstake: Joi.number().integer().required(),
      type: Joi.string().max(255),
      status: Joi.string().max(255),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      type: Joi.string().max(255).required(),
      status: Joi.string().max(255).required(),
      user: Joi.number().integer().required(),
      gamesweepstake: Joi.number().integer().required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      type: Joi.string().max(255),
      status: Joi.string().max(255),
      user: Joi.number().integer(),
      gamesweepstake: Joi.number().integer(),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { userGameValidation };
