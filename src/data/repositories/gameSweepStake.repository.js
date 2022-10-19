import { GameSweepStake } from 'data/models';
import { NotFound } from 'server/utils/errors';

class GameSweepStakeRepository {
  static async create(game, sweepstake) {
    const createdGameSweepStake = await GameSweepStake.create({
      game,
      sweepstake,
    });

    return createdGameSweepStake;
  }

  static get(id) {
    return GameSweepStake.findByPk(id, { include: ['gamesweepstakeId'] });
  }

  static getAll(filters) {
    return GameSweepStake.findAll({
      where: filters,
      include: ['gamesweepstakeId'],
    });
  }

  static async update(id, game, sweepstake) {
    return this.partialUpdate({
      id,
      game,
      sweepstake,
    });
  }

  static async partialUpdate({ id, game, sweepstake }) {
    const foundGameSweepStake = await GameSweepStake.findByPk(id);
    if (!foundGameSweepStake) throw new NotFound(`GameSweepStake with primary key ${id} not found`);
    if (game !== undefined) foundGameSweepStake.game = game;
    if (sweepstake !== undefined) foundGameSweepStake.sweepstake = sweepstake;
    await foundGameSweepStake.save();
    return foundGameSweepStake.reload();
  }

  static async destroy(id) {
    const foundGameSweepStake = await GameSweepStake.findByPk(id);
    if (!foundGameSweepStake) throw new NotFound(`GameSweepStake with primary key ${id} not found`);
    await foundGameSweepStake.destroy();
    return foundGameSweepStake;
  }
}

export { GameSweepStakeRepository };
