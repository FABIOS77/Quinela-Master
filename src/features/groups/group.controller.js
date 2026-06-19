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

module.exports = { createGroup, joinGroup, getMyGroups };