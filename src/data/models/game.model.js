import { DataTypes } from 'sequelize';

const gameModel = (sequelize) => {
  const Game = sequelize.define(
    'Game',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  Game.associate = (models) => {
    Game.hasMany(models.GameSweepStake, {
      foreignKey: { name: 'game', allowNull: false },
      as: 'gameId',

      onDelete: 'cascade',
    });
  };
};

export { gameModel };
