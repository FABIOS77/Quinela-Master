const { Router } = require('express');
const dashboardController = require('./dashboard.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');

const router = Router();

router.use(verifyToken);

router.get('/summary', dashboardController.getSummary);

module.exports = router;