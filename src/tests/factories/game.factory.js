import { random, date } from 'faker';
import { Game } from 'data/models';
import { dateToUTC } from 'server/utils/functions';

const buildGame = async (gameFks) => {
  const resGame = {};

  resGame.startDate = dateToUTC(date.past()).format('YYYY-MM-DD');
  resGame.endDate = dateToUTC(date.past()).format('YYYY-MM-DD');
  resGame.status = random.word().slice(0, 255);

  return resGame;
};

const createGame = async (fakeGame) => {
  const game = await Game.create(fakeGame);
  return game;
};

export { buildGame, createGame };
