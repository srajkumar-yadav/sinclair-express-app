import { SweepStake } from 'data/models';
import { NotFound } from 'server/utils/errors';

class SweepStakeRepository {
  static async create(startDate, endDate, status, type, totalTickets) {
    const createdSweepStake = await SweepStake.create({
      startDate,
      endDate,
      status,
      type,
      totalTickets,
    });

    return createdSweepStake;
  }

  static get(id) {
    return SweepStake.findByPk(id, { include: ['sweepStakeId', 'sweepId'] });
  }

  static getAll(filters) {
    return SweepStake.findAll({
      where: filters,
      include: ['sweepStakeId', 'sweepId'],
    });
  }

  static async update(id, startDate, endDate, status, type, totalTickets) {
    return this.partialUpdate({
      id,
      startDate,
      endDate,
      status,
      type,
      totalTickets,
    });
  }

  static async partialUpdate({ id, startDate, endDate, status, type, totalTickets }) {
    const foundSweepStake = await SweepStake.findByPk(id);
    if (!foundSweepStake) throw new NotFound(`SweepStake with primary key ${id} not found`);
    if (startDate !== undefined) foundSweepStake.startDate = startDate;
    if (endDate !== undefined) foundSweepStake.endDate = endDate;
    if (status !== undefined) foundSweepStake.status = status;
    if (type !== undefined) foundSweepStake.type = type;
    if (totalTickets !== undefined) foundSweepStake.totalTickets = totalTickets;
    await foundSweepStake.save();
    return foundSweepStake.reload();
  }

  static async destroy(id) {
    const foundSweepStake = await SweepStake.findByPk(id);
    if (!foundSweepStake) throw new NotFound(`SweepStake with primary key ${id} not found`);
    await foundSweepStake.destroy();
    return foundSweepStake;
  }
}

export { SweepStakeRepository };
