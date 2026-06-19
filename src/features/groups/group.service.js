const { Group, GroupMember, User } = require('../../database/associations');
const { sequelize } = require('../../database/connection');
const { generateInviteCode } = require('../../helpers/codeGenerator.helper');

const createGroup = async (userId, groupName) => {
  const transaction = await sequelize.transaction();

  try {
    let inviteCode;
    let isUnique = false;
    
    while (!isUnique) {
      inviteCode = generateInviteCode();
      const existing = await Group.findOne({ where: { invite_code: inviteCode }, transaction });
      if (!existing) isUnique = true;
    }

    
    const newGroup = await Group.create({
      name: groupName,
      invite_code: inviteCode,
      owner_id: userId,
    }, { transaction });

    await GroupMember.create({
      user_id: userId,
      group_id: newGroup.id,
      total_points: 0,
    }, { transaction });
    await transaction.commit();
    return newGroup;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const joinGroup = async (userId, inviteCode) => {
  const group = await Group.findOne({ where: { invite_code: inviteCode } });
  if (!group) {
    const error = new Error('Código de invitación inválido o grupo no encontrado');
    error.statusCode = 404;
    throw error;
  }

  const existingMember = await GroupMember.findOne({
    where: { user_id: userId, group_id: group.id }
  });

  if (existingMember) {
    const error = new Error('Ya eres miembro de este grupo');
    error.statusCode = 400;
    throw error;
  }
  await GroupMember.create({
    user_id: userId,
    group_id: group.id,
    total_points: 0,
  });

  return group;
};

const getUserGroups = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [{
      model: Group,
      as: 'groups', 
      through: { attributes: ['total_points', 'createdAt'] } 
    }]
  });

  return user ? user.groups : [];
};

module.exports = { createGroup, joinGroup, getUserGroups };