import { CREATED } from 'http-status';
import { GameSweepStakeService, GameService, SweepStakeService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class GameSweepStakeController {
  static async create(req, res, next) {
    try {
      const { game, sweepstake } = req.body;
      if (game !== null && typeof game !== 'undefined') {
        const dbgame = await GameService.get(game);
        if (!dbgame) {
          throw new NotFound(`Game ${game} not found`);
        }
      }
      if (sweepstake !== null && typeof sweepstake !== 'undefined') {
        const dbsweepstake = await SweepStakeService.get(sweepstake);
        if (!dbsweepstake) {
          throw new NotFound(`SweepStake ${sweepstake} not found`);
        }
      }
      const newGameSweepStake = await GameSweepStakeService.create(game, sweepstake);
      res.locals.status = CREATED;
      res.locals.data = newGameSweepStake;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const gameSweepStakeObject = await GameSweepStakeService.get(id);
      if (!gameSweepStakeObject) {
        throw new NotFound(`GameSweepStake with primary key ${id} not found`);
      }
      res.locals.data = gameSweepStakeObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allGameSweepStakes = await GameSweepStakeService.getAll(filters);
      res.locals.data = allGameSweepStakes;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { game, sweepstake } = req.body;
      if (game !== null && typeof game !== 'undefined') {
        if (!(await GameService.get(game))) {
          throw new NotFound(`Game ${game} not found`);
        }
      }
      if (sweepstake !== null && typeof sweepstake !== 'undefined') {
        if (!(await SweepStakeService.get(sweepstake))) {
          throw new NotFound(`SweepStake ${sweepstake} not found`);
        }
      }

      const updatedGameSweepStake = await GameSweepStakeService.update(id, game, sweepstake);

      res.locals.data = updatedGameSweepStake;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { game, sweepstake } = req.body;
      if (game !== null && typeof game !== 'undefined') {
        if (!(await GameService.get(game))) {
          throw new NotFound(`Game ${game} not found`);
        }
      }
      if (sweepstake !== null && typeof sweepstake !== 'undefined') {
        if (!(await SweepStakeService.get(sweepstake))) {
          throw new NotFound(`SweepStake ${sweepstake} not found`);
        }
      }

      const updatedGameSweepStake = await GameSweepStakeService.partialUpdate(id, game, sweepstake);

      res.locals.data = updatedGameSweepStake;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const gameSweepStakeDelete = await GameSweepStakeService.destroy(id);
      res.locals.data = gameSweepStakeDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { GameSweepStakeController };
