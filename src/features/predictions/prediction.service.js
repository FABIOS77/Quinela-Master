const { Prediction, Match } = require('../../database/associations');

const registerOrUpdatePrediction = async (userId, predictionData) => {
  const { match_id, home_prediction, away_prediction } = predictionData;
  const match = await Match.findByPk(match_id);
  if (!match) {
    const error = new Error('El partido no existe');
    error.statusCode = 404;
    throw error;
  }

  const now = new Date();
  const matchDate = new Date(match.match_date);

  if (now >= matchDate || match.status !== 'SCHEDULED') {
    const error = new Error('No puedes registrar o modificar un pronóstico de un partido que ya comenzó o finalizó');
    error.statusCode = 403;
    throw error;
  }

  let prediction = await Prediction.findOne({
    where: { user_id: userId, match_id: match_id }
  });

  if (prediction) {
    prediction.home_prediction = home_prediction;
    prediction.away_prediction = away_prediction;
    await prediction.save();
  } else {
    // Si no existe, la creamos
    prediction = await Prediction.create({
      user_id: userId,
      match_id: match_id,
      home_prediction,
      away_prediction,
      points_earned: 0
    });
  }

  return prediction;
};

const getUserPredictions = async (userId) => {
  const predictions = await Prediction.findAll({
    where: { user_id: userId },
    include: [{
      model: Match,
      as: 'match',
      attributes: ['home_team', 'away_team', 'match_date', 'status', 'home_score', 'away_score']
    }],
    order: [[{ model: Match, as: 'match' }, 'match_date', 'DESC']]
  });

  return predictions;
};

module.exports = { registerOrUpdatePrediction, getUserPredictions };