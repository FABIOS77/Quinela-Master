const { Router } = require('express');
const authController = require('./auth.controller');
const validateSchema = require('../../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('./auth.validator');

const router = Router();

router.post('/register', validateSchema(registerSchema), authController.registerUser);
router.post('/login', validateSchema(loginSchema), authController.loginUser);

module.exports = router;