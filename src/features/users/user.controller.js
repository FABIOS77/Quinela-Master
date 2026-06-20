const userService = require('./user.service');

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    
    const user = await userService.getUserProfile(userId);
    
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};
const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateUserProfile(req.user.id, req.body);
    res.status(200).json({ status: 'success', data: { user } });
  } catch (error) { next(error); }
};

module.exports = { getProfile, updateProfile };