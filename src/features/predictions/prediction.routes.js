const { Router } = require('express');
const predictionController = require('./prediction.controller');
const validateSchema = require('../../middlewares/validate.middleware');
const { verifyToken } = require('../../middlewares/auth.middleware');
const { predictionSchema } = require('./prediction.validator');

const router = Router();

router.use(verifyToken);

router.post('/', validateSchema(predictionSchema), predictionController.upsertPrediction);
router.get('/my-predictions', predictionController.getMyPredictions);

module.exports = router;