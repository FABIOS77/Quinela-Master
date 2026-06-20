const { Router } = require('express');
const matchController = require('./match.controller');
const validateSchema = require('../../middlewares/validate.middleware');
const { verifyToken, restrictTo } = require('../../middlewares/auth.middleware');
const { createMatchSchema, updateMatchSchema } = require('./match.validator');

const router = Router();

router.use(verifyToken);

router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getSingleMatch);

router.post(
  '/', 
  restrictTo('ADMIN'),
  validateSchema(createMatchSchema), 
  matchController.createNewMatch
);
router.put(
  '/:id',
  restrictTo('ADMIN'),
  validateSchema(updateMatchSchema),
  matchController.updateExistingMatch
);

module.exports = router;