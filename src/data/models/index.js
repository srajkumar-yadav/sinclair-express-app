import Sequelize from 'sequelize';
import config from 'config';

import { awardsModel } from './awards.model';
import { gameModel } from './game.model';
import { gameSweepStakeModel } from './gameSweepStake.model';
import { sweepStakeModel } from './sweepStake.model';
import { userModel } from './user.model';
import { userGameModel } from './userGame.model';

const pg = require('pg');

// https://github.com/sequelize/sequelize/issues/4550
pg.defaults.parseInt8 = true;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
});

userModel(sequelize);
gameModel(sequelize);
sweepStakeModel(sequelize);
userGameModel(sequelize);
gameSweepStakeModel(sequelize);
awardsModel(sequelize);

const { User, Game, SweepStake, UserGame, GameSweepStake, Awards } = sequelize.models;

User.associate(sequelize.models);
Game.associate(sequelize.models);
SweepStake.associate(sequelize.models);
UserGame.associate(sequelize.models);
GameSweepStake.associate(sequelize.models);
Awards.associate(sequelize.models);

if (process.env.NODE_ENV !== 'test' && !process.env.USE_MIGRATIONS) {
  sequelize.sync({ alter: true });
}

export { sequelize, User, Game, SweepStake, UserGame, GameSweepStake, Awards };
