import { UserGameRepository } from 'data/repositories';

class UserGameService {
  static create(type, status, user, gamesweepstake) {
    return UserGameRepository.create(type, status, user, gamesweepstake);
  }

  static get(id) {
    return UserGameRepository.get(id);
  }

  static getAll(args) {
    return UserGameRepository.getAll(args);
  }

  static update(id, type, status, user, gamesweepstake) {
    return UserGameRepository.update(id, type, status, user, gamesweepstake);
  }

  static partialUpdate(id, type, status, user, gamesweepstake) {
    return UserGameRepository.partialUpdate({ id, type, status, user, gamesweepstake });
  }

  static destroy(id) {
    return UserGameRepository.destroy(id);
  }
}

export { UserGameService };
