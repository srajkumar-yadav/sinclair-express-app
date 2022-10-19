import { Game } from 'data/models';
import { NotFound } from 'server/utils/errors';

class GameRepository {
  static async create(startDate, endDate, status) {
    const createdGame = await Game.create({
      startDate,
      endDate,
      status,
    });

    return createdGame;
  }

  static get(id) {
    return Game.findByPk(id, { include: ['gameId'] });
  }

  static getAll(filters) {
    return Game.findAll({
      where: filters,
      include: ['gameId'],
    });
  }

  static async update(id, startDate, endDate, status) {
    return this.partialUpdate({
      id,
      startDate,
      endDate,
      status,
    });
  }

  static async partialUpdate({ id, startDate, endDate, status }) {
    const foundGame = await Game.findByPk(id);
    if (!foundGame) throw new NotFound(`Game with primary key ${id} not found`);
    if (startDate !== undefined) foundGame.startDate = startDate;
    if (endDate !== undefined) foundGame.endDate = endDate;
    if (status !== undefined) foundGame.status = status;
    await foundGame.save();
    return foundGame.reload();
  }

  static async destroy(id) {
    const foundGame = await Game.findByPk(id);
    if (!foundGame) throw new NotFound(`Game with primary key ${id} not found`);
    await foundGame.destroy();
    return foundGame;
  }
}

export { GameRepository };
