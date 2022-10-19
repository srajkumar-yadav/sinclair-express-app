import { DataTypes } from 'sequelize';

const awardsModel = (sequelize) => {
  const Awards = sequelize.define(
    'Awards',
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
  Awards.associate = (models) => {
    Awards.belongsTo(models.User, { foreignKey: { name: 'user', allowNull: false }, as: 'user_' });
    Awards.belongsTo(models.SweepStake, {
      foreignKey: { name: 'sweepstake', allowNull: false },
      as: 'sweepstake_',
    });
  };
};

export { awardsModel };
