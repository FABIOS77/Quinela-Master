const config = require('../config/env.config');

const errorHandler = (err, req, res, next) => {
  if (config.env === 'development') {
    console.error(`[ERROR]: ${err.message}`);
    console.error(err.stack);
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Error interno del servidor',
    ...(config.env === 'development' && { stack: err.stack }),
  });
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = { errorHandler, notFoundHandler };