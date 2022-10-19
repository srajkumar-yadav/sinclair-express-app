import { DataTypes } from 'sequelize';

const sweepStakeModel = (sequelize) => {
  const SweepStake = sequelize.define(
    'SweepStake',
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
      type: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      totalTickets: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );
  SweepStake.associate = (models) => {
    SweepStake.hasMany(models.GameSweepStake, {
      foreignKey: { name: 'sweepstake', allowNull: false },
      as: 'sweepStakeId',

      onDelete: 'cascade',
    });
    SweepStake.hasMany(models.Awards, {
      foreignKey: { name: 'sweepstake', allowNull: false },
      as: 'sweepId',

      onDelete: 'cascade',
    });
  };
};

export { sweepStakeModel };
