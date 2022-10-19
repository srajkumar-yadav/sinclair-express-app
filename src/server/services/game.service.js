import { GameRepository } from 'data/repositories';

class GameService {
  static create(startDate, endDate, status) {
    return GameRepository.create(startDate, endDate, status);
  }

  static get(id) {
    return GameRepository.get(id);
  }

  static getAll(args) {
    return GameRepository.getAll(args);
  }

  static update(id, startDate, endDate, status) {
    return GameRepository.update(id, startDate, endDate, status);
  }

  static partialUpdate(id, startDate, endDate, status) {
    return GameRepository.partialUpdate({ id, startDate, endDate, status });
  }

  static destroy(id) {
    return GameRepository.destroy(id);
  }
}

export { GameService };
