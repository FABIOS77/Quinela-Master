const predictionService = require('./prediction.service');

const upsertPrediction = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const predictionData = req.body;
    
    const prediction = await predictionService.registerOrUpdatePrediction(userId, predictionData);
    
    res.status(200).json({
      status: 'success',
      message: 'Pronóstico registrado/actualizado correctamente',
      data: { prediction },
    });
  } catch (error) {
    next(error);
  }
};

const getMyPredictions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const predictions = await predictionService.getUserPredictions(userId);
    
    res.status(200).json({
      status: 'success',
      results: predictions.length,
      data: { predictions },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { upsertPrediction, getMyPredictions };