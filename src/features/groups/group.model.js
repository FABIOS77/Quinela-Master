const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/connection');

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invite_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  owner_id: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  tableName: 'groups',
  timestamps: true,
});

module.exports = Group;