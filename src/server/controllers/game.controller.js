import { CREATED } from 'http-status';
import { GameService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class GameController {
  static async create(req, res, next) {
    try {
      const { startDate, endDate, status } = req.body;
      const newGame = await GameService.create(startDate, endDate, status);
      res.locals.status = CREATED;
      res.locals.data = newGame;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const gameObject = await GameService.get(id);
      if (!gameObject) {
        throw new NotFound(`Game with primary key ${id} not found`);
      }
      res.locals.data = gameObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allGames = await GameService.getAll(filters);
      res.locals.data = allGames;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { startDate, endDate, status } = req.body;

      const updatedGame = await GameService.update(id, startDate, endDate, status);

      res.locals.data = updatedGame;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { startDate, endDate, status } = req.body;

      const updatedGame = await GameService.partialUpdate(id, startDate, endDate, status);

      res.locals.data = updatedGame;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const gameDelete = await GameService.destroy(id);
      res.locals.data = gameDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { GameController };
