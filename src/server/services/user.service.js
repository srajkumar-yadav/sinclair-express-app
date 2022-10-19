import { UserRepository } from 'data/repositories';

class UserService {
  static create(username, email, walletIndex, walletId) {
    return UserRepository.create(username, email, walletIndex, walletId);
  }

  static get(id) {
    return UserRepository.get(id);
  }

  static getAll(args) {
    return UserRepository.getAll(args);
  }

  static update(id, username, email, walletIndex, walletId) {
    return UserRepository.update(id, username, email, walletIndex, walletId);
  }

  static partialUpdate(id, username, email, walletIndex, walletId) {
    return UserRepository.partialUpdate({ id, username, email, walletIndex, walletId });
  }

  static destroy(id) {
    return UserRepository.destroy(id);
  }
}

export { UserService };
