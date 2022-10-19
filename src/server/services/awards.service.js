import { AwardsRepository } from 'data/repositories';

class AwardsService {
  static create(user, sweepstake) {
    return AwardsRepository.create(user, sweepstake);
  }

  static get(id) {
    return AwardsRepository.get(id);
  }

  static getAll(args) {
    return AwardsRepository.getAll(args);
  }

  static update(id, user, sweepstake) {
    return AwardsRepository.update(id, user, sweepstake);
  }

  static partialUpdate(id, user, sweepstake) {
    return AwardsRepository.partialUpdate({ id, user, sweepstake });
  }

  static destroy(id) {
    return AwardsRepository.destroy(id);
  }
}

export { AwardsService };
