const groupService = require('./group.service');

const createGroup = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    
    const group = await groupService.createGroup(userId, name);
    
    res.status(201).json({
      status: 'success',
      message: 'Grupo creado exitosamente',
      data: { group },
    });
  } catch (error) {
    next(error);
  }
};

const joinGroup = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { invite_code } = req.body;
    
    const group = await groupService.joinGroup(userId, invite_code);
    
    res.status(200).json({
      status: 'success',
      message: `Te has unido al grupo ${group.name} exitosamente`,
      data: { group },
    });
  } catch (error) {
    next(error);
  }
};

const getMyGroups = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const groups = await groupService.getUserGroups(userId);
    
    res.status(200).json({
      status: 'success',
      data: { groups },
    });
  } catch (error) {
    next(error);
  }
};
const getInviteCode = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: groupId } = req.params;
    
    const inviteCode = await groupService.getGroupInviteCode(userId, groupId);
    
    res.status(200).json({
      status: 'success',
      data: { invite_code: inviteCode },
    });
  } catch (error) {
    next(error);
  }
};

const getMembers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: groupId } = req.params;
    
    const members = await groupService.getGroupMembers(userId, groupId);
    
    res.status(200).json({
      status: 'success',
      results: members.length,
      data: { members },
    });
  } catch (error) {
    next(error);
  }
};

const getLeaderboard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: groupId } = req.params;
    
    const leaderboard = await groupService.getGroupLeaderboard(userId, groupId);
    
    res.status(200).json({
      status: 'success',
      data: { leaderboard },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  createGroup, 
  joinGroup, 
  getMyGroups,
  getInviteCode, 
  getMembers, 
  getLeaderboard };