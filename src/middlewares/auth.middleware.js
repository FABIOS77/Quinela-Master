const jwt = require('jsonwebtoken');
const config = require('../config/env.config');
const { User } = require('../database/associations');

const verifyToken = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'No has iniciado sesión. Por favor, provee un token de acceso.' 
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'El usuario dueño de este token ya no existe.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Token inválido o expirado. Por favor, inicia sesión nuevamente.' 
    });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: 'error', 
        message: 'No tienes permisos suficientes para realizar esta acción.' 
      });
    }
    next();
  };
};

module.exports = { verifyToken, restrictTo };