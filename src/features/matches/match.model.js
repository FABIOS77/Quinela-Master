const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/connection');

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  external_api_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  home_team: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  match_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('SCHEDULED', 'IN_PROGRESS', 'FINISHED'),
    defaultValue: 'SCHEDULED',
  },
  home_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  away_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stadium: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'matches',
  timestamps: true,
  indexes: [
    { fields: ['match_date'] },
    { fields: ['status'] }
  ]
});

module.exports = Match;