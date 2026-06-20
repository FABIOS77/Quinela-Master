const { Router } = require('express');
const userController = require('./user.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');
const { validateSchema } = require('../../middlewares/validate.middleware');
const { updateProfileSchema } = require('./user.validator');
const router = Router();

router.get('/profile', verifyToken, userController.getProfile);
router.put('/profile', verifyToken, validateSchema(updateProfileSchema), userController.updateProfile);

module.exports = router;