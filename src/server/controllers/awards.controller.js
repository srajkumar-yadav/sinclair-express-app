import { CREATED } from 'http-status';
import { AwardsService, UserService, SweepStakeService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class AwardsController {
  static async create(req, res, next) {
    try {
      const { user, sweepstake } = req.body;
      if (user !== null && typeof user !== 'undefined') {
        const dbuser = await UserService.get(user);
        if (!dbuser) {
          throw new NotFound(`User ${user} not found`);
        }
      }
      if (sweepstake !== null && typeof sweepstake !== 'undefined') {
        const dbsweepstake = await SweepStakeService.get(sweepstake);
        if (!dbsweepstake) {
          throw new NotFound(`SweepStake ${sweepstake} not found`);
        }
      }
      const newAwards = await AwardsService.create(user, sweepstake);
      res.locals.status = CREATED;
      res.locals.data = newAwards;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const awardsObject = await AwardsService.get(id);
      if (!awardsObject) {
        throw new NotFound(`Awards with primary key ${id} not found`);
      }
      res.locals.data = awardsObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allAwardss = await AwardsService.getAll(filters);
      res.locals.data = allAwardss;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { user, sweepstake } = req.body;
      if (user !== null && typeof user !== 'undefined') {
        if (!(await UserService.get(user))) {
          throw new NotFound(`User ${user} not found`);
        }
      }
      if (sweepstake !== null && typeof sweepstake !== 'undefined') {
        if (!(await SweepStakeService.get(sweepstake))) {
          throw new NotFound(`SweepStake ${sweepstake} not found`);
        }
      }

      const updatedAwards = await AwardsService.update(id, user, sweepstake);

      res.locals.data = updatedAwards;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { user, sweepstake } = req.body;
      if (user !== null && typeof user !== 'undefined') {
        if (!(await UserService.get(user))) {
          throw new NotFound(`User ${user} not found`);
        }
      }
      if (sweepstake !== null && typeof sweepstake !== 'undefined') {
        if (!(await SweepStakeService.get(sweepstake))) {
          throw new NotFound(`SweepStake ${sweepstake} not found`);
        }
      }

      const updatedAwards = await AwardsService.partialUpdate(id, user, sweepstake);

      res.locals.data = updatedAwards;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const awardsDelete = await AwardsService.destroy(id);
      res.locals.data = awardsDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { AwardsController };
