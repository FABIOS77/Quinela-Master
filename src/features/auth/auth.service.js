const bcrypt = require('bcrypt');
const { User } = require('../../database/associations');
const { generateToken } = require('../../utils/jwt.util');

const register = async (userData) => {
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    const error = new Error('El correo electrónico ya está registrado');
    error.statusCode = 400;
    throw error;
  }

  const newUser = await User.create(userData);


  const token = generateToken(newUser);

  const { password, ...userWithoutPassword } = newUser.toJSON();
  
  return { user: userWithoutPassword, token };
};

const login = async (email, plainPassword) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error('Credenciales inválidas');
    error.statusCode = 401;
    throw error;
  }


  const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
  if (!isPasswordValid) {
    const error = new Error('Credenciales inválidas');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user);
  
  const { password, ...userWithoutPassword } = user.toJSON();

  return { user: userWithoutPassword, token };
};

module.exports = { register, login };