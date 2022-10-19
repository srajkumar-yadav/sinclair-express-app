import { CREATED } from 'http-status';
import { UserGameService, UserService, GameSweepStakeService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class UserGameController {
  static async create(req, res, next) {
    try {
      const { type, status, user, gamesweepstake } = req.body;
      if (user !== null && typeof user !== 'undefined') {
        const dbuser = await UserService.get(user);
        if (!dbuser) {
          throw new NotFound(`User ${user} not found`);
        }
      }
      if (gamesweepstake !== null && typeof gamesweepstake !== 'undefined') {
        const dbgamesweepstake = await GameSweepStakeService.get(gamesweepstake);
        if (!dbgamesweepstake) {
          throw new NotFound(`GameSweepStake ${gamesweepstake} not found`);
        }
      }
      const newUserGame = await UserGameService.create(type, status, user, gamesweepstake);
      res.locals.status = CREATED;
      res.locals.data = newUserGame;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const userGameObject = await UserGameService.get(id);
      if (!userGameObject) {
        throw new NotFound(`UserGame with primary key ${id} not found`);
      }
      res.locals.data = userGameObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allUserGames = await UserGameService.getAll(filters);
      res.locals.data = allUserGames;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { type, status, user, gamesweepstake } = req.body;
      if (user !== null && typeof user !== 'undefined') {
        if (!(await UserService.get(user))) {
          throw new NotFound(`User ${user} not found`);
        }
      }
      if (gamesweepstake !== null && typeof gamesweepstake !== 'undefined') {
        if (!(await GameSweepStakeService.get(gamesweepstake))) {
          throw new NotFound(`GameSweepStake ${gamesweepstake} not found`);
        }
      }

      const updatedUserGame = await UserGameService.update(id, type, status, user, gamesweepstake);

      res.locals.data = updatedUserGame;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { type, status, user, gamesweepstake } = req.body;
      if (user !== null && typeof user !== 'undefined') {
        if (!(await UserService.get(user))) {
          throw new NotFound(`User ${user} not found`);
        }
      }
      if (gamesweepstake !== null && typeof gamesweepstake !== 'undefined') {
        if (!(await GameSweepStakeService.get(gamesweepstake))) {
          throw new NotFound(`GameSweepStake ${gamesweepstake} not found`);
        }
      }

      const updatedUserGame = await UserGameService.partialUpdate(
        id,
        type,
        status,
        user,
        gamesweepstake
      );

      res.locals.data = updatedUserGame;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const userGameDelete = await UserGameService.destroy(id);
      res.locals.data = userGameDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { UserGameController };
