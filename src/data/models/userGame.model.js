import { DataTypes } from 'sequelize';

const userGameModel = (sequelize) => {
  const UserGame = sequelize.define(
    'UserGame',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
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
  UserGame.associate = (models) => {
    UserGame.belongsTo(models.User, {
      foreignKey: { name: 'user', allowNull: false },
      as: 'user_',
    });
    UserGame.belongsTo(models.GameSweepStake, {
      foreignKey: { name: 'gamesweepstake', allowNull: false },
      as: 'gamesweepstake_',
    });
  };
};

export { userGameModel };
