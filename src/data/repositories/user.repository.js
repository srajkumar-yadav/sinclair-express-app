import { User } from 'data/models';
import { NotFound } from 'server/utils/errors';

class UserRepository {
  static async create(username, email, walletIndex, walletId) {
    const createdUser = await User.create({
      username,
      email,
      walletIndex,
      walletId,
    });

    return createdUser;
  }

  static get(id) {
    return User.findByPk(id, { include: ['userId', 'usersId'] });
  }

  static getAll(filters) {
    return User.findAll({
      where: filters,
      include: ['userId', 'usersId'],
    });
  }

  static async update(id, username, email, walletIndex, walletId) {
    return this.partialUpdate({
      id,
      username,
      email,
      walletIndex,
      walletId,
    });
  }

  static async partialUpdate({ id, username, email, walletIndex, walletId }) {
    const foundUser = await User.findByPk(id);
    if (!foundUser) throw new NotFound(`User with primary key ${id} not found`);
    if (username !== undefined) foundUser.username = username;
    if (email !== undefined) foundUser.email = email;
    if (walletIndex !== undefined) foundUser.walletIndex = walletIndex;
    if (walletId !== undefined) foundUser.walletId = walletId;
    await foundUser.save();
    return foundUser.reload();
  }

  static async destroy(id) {
    const foundUser = await User.findByPk(id);
    if (!foundUser) throw new NotFound(`User with primary key ${id} not found`);
    await foundUser.destroy();
    return foundUser;
  }
}

export { UserRepository };
