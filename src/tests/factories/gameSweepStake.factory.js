import { GameSweepStake } from 'data/models';
import { buildGame, createGame } from './game.factory';
import { buildSweepStake, createSweepStake } from './sweepStake.factory';

const buildGameSweepStake = async (gameSweepStakeFks) => {
  const resGameSweepStake = {};
  let { game } = gameSweepStakeFks;
  let { sweepstake } = gameSweepStakeFks;

  if (gameSweepStakeFks.game === null || typeof gameSweepStakeFks.game === 'undefined') {
    const fakeGame = await buildGame({});
    const createdFakeGame = await createGame(fakeGame);
    game = createdFakeGame.id;
  }
  if (
    gameSweepStakeFks.sweepstake === null ||
    typeof gameSweepStakeFks.sweepstake === 'undefined'
  ) {
    const fakeSweepstake = await buildSweepStake({});
    const createdFakeSweepstake = await createSweepStake(fakeSweepstake);
    sweepstake = createdFakeSweepstake.id;
  }
  resGameSweepStake.game = game;
  resGameSweepStake.sweepstake = sweepstake;

  return resGameSweepStake;
};

const createGameSweepStake = async (fakeGameSweepStake) => {
  const gameSweepStake = await GameSweepStake.create(fakeGameSweepStake);
  return gameSweepStake;
};

export { buildGameSweepStake, createGameSweepStake };
