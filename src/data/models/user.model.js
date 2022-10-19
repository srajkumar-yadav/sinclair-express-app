import { DataTypes } from 'sequelize';

const userModel = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [0, 255],
        },
      },
      walletIndex: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      walletId: {
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
  User.associate = (models) => {
    User.hasMany(models.UserGame, {
      foreignKey: { name: 'user', allowNull: false },
      as: 'userId',

      onDelete: 'cascade',
    });
    User.hasMany(models.Awards, {
      foreignKey: { name: 'user', allowNull: false },
      as: 'usersId',

      onDelete: 'cascade',
    });
  };
};

export { userModel };
