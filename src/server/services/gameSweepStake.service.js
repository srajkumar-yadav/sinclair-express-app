import { GameSweepStakeRepository } from 'data/repositories';

class GameSweepStakeService {
  static create(game, sweepstake) {
    return GameSweepStakeRepository.create(game, sweepstake);
  }

  static get(id) {
    return GameSweepStakeRepository.get(id);
  }

  static getAll(args) {
    return GameSweepStakeRepository.getAll(args);
  }

  static update(id, game, sweepstake) {
    return GameSweepStakeRepository.update(id, game, sweepstake);
  }

  static partialUpdate(id, game, sweepstake) {
    return GameSweepStakeRepository.partialUpdate({ id, game, sweepstake });
  }

  static destroy(id) {
    return GameSweepStakeRepository.destroy(id);
  }
}

export { GameSweepStakeService };
