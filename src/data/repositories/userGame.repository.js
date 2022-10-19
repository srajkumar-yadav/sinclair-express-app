import { UserGame } from 'data/models';
import { NotFound } from 'server/utils/errors';

class UserGameRepository {
  static async create(type, status, user, gamesweepstake) {
    const createdUserGame = await UserGame.create({
      type,
      status,
      user,
      gamesweepstake,
    });

    return createdUserGame;
  }

  static get(id) {
    return UserGame.findByPk(id, { include: [] });
  }

  static getAll(filters) {
    return UserGame.findAll({
      where: filters,
      include: [],
    });
  }

  static async update(id, type, status, user, gamesweepstake) {
    return this.partialUpdate({
      id,
      type,
      status,
      user,
      gamesweepstake,
    });
  }

  static async partialUpdate({ id, type, status, user, gamesweepstake }) {
    const foundUserGame = await UserGame.findByPk(id);
    if (!foundUserGame) throw new NotFound(`UserGame with primary key ${id} not found`);
    if (type !== undefined) foundUserGame.type = type;
    if (status !== undefined) foundUserGame.status = status;
    if (user !== undefined) foundUserGame.user = user;
    if (gamesweepstake !== undefined) foundUserGame.gamesweepstake = gamesweepstake;
    await foundUserGame.save();
    return foundUserGame.reload();
  }

  static async destroy(id) {
    const foundUserGame = await UserGame.findByPk(id);
    if (!foundUserGame) throw new NotFound(`UserGame with primary key ${id} not found`);
    await foundUserGame.destroy();
    return foundUserGame;
  }
}

export { UserGameRepository };
