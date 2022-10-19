import { awardsValidation } from './awards.validation';
import { gameValidation } from './game.validation';
import { gameSweepStakeValidation } from './gameSweepStake.validation';
import { sweepStakeValidation } from './sweepStake.validation';
import { userValidation } from './user.validation';
import { userGameValidation } from './userGame.validation';

const options = { keyByField: true };

export {
  userValidation,
  gameValidation,
  sweepStakeValidation,
  userGameValidation,
  gameSweepStakeValidation,
  awardsValidation,
  options,
};
