const { User } = require('../../database/associations');

const getUserProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return user;
};
const updateUserProfile = async (userId, data) => {
  const user = await User.findByPk(userId);
  if (!user) { const e = new Error('Usuario no encontrado'); e.statusCode = 404; throw e; }
  if (data.name) user.name = data.name;
  if (data.password) user.password = data.password;
  await user.save();
  const { password, ...userWithoutPass } = user.toJSON();
  return userWithoutPass;
};

module.exports = { getUserProfile, updateUserProfile };