const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    const errors = error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    
    return res.status(400).json({
      status: 'error',
      message: 'Error de validación en los datos enviados',
      errors,
    });
  }
};

module.exports = validateSchema;