const { Router } = require('express');
const userController = require('./user.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');

const router = Router();

router.get('/profile', verifyToken, userController.getProfile);

module.exports = router;