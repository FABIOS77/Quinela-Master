const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/connection');

const GroupMember = sequelize.define('GroupMember', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total_points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'group_members',
  timestamps: true,
});

module.exports = GroupMember;