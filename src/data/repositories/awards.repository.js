import { Awards } from 'data/models';
import { NotFound } from 'server/utils/errors';

class AwardsRepository {
  static async create(user, sweepstake) {
    const createdAwards = await Awards.create({
      user,
      sweepstake,
    });

    return createdAwards;
  }

  static get(id) {
    return Awards.findByPk(id, { include: [] });
  }

  static getAll(filters) {
    return Awards.findAll({
      where: filters,
      include: [],
    });
  }

  static async update(id, user, sweepstake) {
    return this.partialUpdate({
      id,
      user,
      sweepstake,
    });
  }

  static async partialUpdate({ id, user, sweepstake }) {
    const foundAwards = await Awards.findByPk(id);
    if (!foundAwards) throw new NotFound(`Awards with primary key ${id} not found`);
    if (user !== undefined) foundAwards.user = user;
    if (sweepstake !== undefined) foundAwards.sweepstake = sweepstake;
    await foundAwards.save();
    return foundAwards.reload();
  }

  static async destroy(id) {
    const foundAwards = await Awards.findByPk(id);
    if (!foundAwards) throw new NotFound(`Awards with primary key ${id} not found`);
    await foundAwards.destroy();
    return foundAwards;
  }
}

export { AwardsRepository };
