const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/connection');

const Prediction = sequelize.define('Prediction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  home_prediction: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_prediction: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  points_earned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'predictions',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'match_id'],
      name: 'unique_user_match_prediction'
    }
  ]
});

module.exports = Prediction;