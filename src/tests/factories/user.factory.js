import { random, datatype } from 'faker';
import { User } from 'data/models';

const buildUser = async (userFks) => {
  const resUser = {};

  resUser.username = random.word().slice(0, 255);
  resUser.email = random.word().slice(0, 255);
  resUser.walletIndex = datatype.number();
  resUser.walletId = random.word().slice(0, 255);

  return resUser;
};

const createUser = async (fakeUser) => {
  const user = await User.create(fakeUser);
  return user;
};

export { buildUser, createUser };
