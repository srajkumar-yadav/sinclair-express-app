import { random } from 'faker';
import { UserGame } from 'data/models';
import { buildGameSweepStake, createGameSweepStake } from './gameSweepStake.factory';
import { buildUser, createUser } from './user.factory';

const buildUserGame = async (userGameFks) => {
  const resUserGame = {};
  let { user } = userGameFks;
  let { gamesweepstake } = userGameFks;

  resUserGame.type = random.word().slice(0, 255);
  resUserGame.status = random.word().slice(0, 255);

  if (userGameFks.user === null || typeof userGameFks.user === 'undefined') {
    const fakeUser = await buildUser({});
    const createdFakeUser = await createUser(fakeUser);
    user = createdFakeUser.id;
  }
  if (userGameFks.gamesweepstake === null || typeof userGameFks.gamesweepstake === 'undefined') {
    const fakeGamesweepstake = await buildGameSweepStake({});
    const createdFakeGamesweepstake = await createGameSweepStake(fakeGamesweepstake);
    gamesweepstake = createdFakeGamesweepstake.id;
  }
  resUserGame.user = user;
  resUserGame.gamesweepstake = gamesweepstake;

  return resUserGame;
};

const createUserGame = async (fakeUserGame) => {
  const userGame = await UserGame.create(fakeUserGame);
  return userGame;
};

export { buildUserGame, createUserGame };
