import { DataTypes } from 'sequelize';

const gameSweepStakeModel = (sequelize) => {
  const GameSweepStake = sequelize.define(
    'GameSweepStake',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  GameSweepStake.associate = (models) => {
    GameSweepStake.hasMany(models.UserGame, {
      foreignKey: { name: 'gamesweepstake', allowNull: false },
      as: 'gamesweepstakeId',

      onDelete: 'cascade',
    });
    GameSweepStake.belongsTo(models.Game, {
      foreignKey: { name: 'game', allowNull: false },
      as: 'game_',
    });
    GameSweepStake.belongsTo(models.SweepStake, {
      foreignKey: { name: 'sweepstake', allowNull: false },
      as: 'sweepstake_',
    });
  };
};

export { gameSweepStakeModel };
