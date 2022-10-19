import { CREATED } from 'http-status';
import { SweepStakeService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class SweepStakeController {
  static async create(req, res, next) {
    try {
      const { startDate, endDate, status, type, totalTickets } = req.body;
      const newSweepStake = await SweepStakeService.create(
        startDate,
        endDate,
        status,
        type,
        totalTickets
      );
      res.locals.status = CREATED;
      res.locals.data = newSweepStake;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const sweepStakeObject = await SweepStakeService.get(id);
      if (!sweepStakeObject) {
        throw new NotFound(`SweepStake with primary key ${id} not found`);
      }
      res.locals.data = sweepStakeObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allSweepStakes = await SweepStakeService.getAll(filters);
      res.locals.data = allSweepStakes;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { startDate, endDate, status, type, totalTickets } = req.body;

      const updatedSweepStake = await SweepStakeService.update(
        id,
        startDate,
        endDate,
        status,
        type,
        totalTickets
      );

      res.locals.data = updatedSweepStake;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { startDate, endDate, status, type, totalTickets } = req.body;

      const updatedSweepStake = await SweepStakeService.partialUpdate(
        id,
        startDate,
        endDate,
        status,
        type,
        totalTickets
      );

      res.locals.data = updatedSweepStake;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const sweepStakeDelete = await SweepStakeService.destroy(id);
      res.locals.data = sweepStakeDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { SweepStakeController };
