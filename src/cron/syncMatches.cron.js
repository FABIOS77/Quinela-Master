const cron = require('node-cron');
const { Op } = require('sequelize');
const { Match, Prediction, GroupMember } = require('../database/associations');
const { sequelize } = require('../database/connection');
const sportsDbClient = require('../integrations/theSportsDb.client');

const calculatePoints = (predHome, predAway, actHome, actAway) => {
  if (predHome === actHome && predAway === actAway) {
    return 3;
  }

  let predWinner = 'TIE';
  if (predHome > predAway) predWinner = 'HOME';
  if (predHome < predAway) predWinner = 'AWAY';

  let actWinner = 'TIE';
  if (actHome > actAway) actWinner = 'HOME';
  if (actHome < actAway) actWinner = 'AWAY';

  if (predWinner === actWinner) {
    return 1;
  }

  return 0;
};


const processMatches = async () => {
  console.log('[CRON] Iniciando verificación de partidos finalizados...');
  
  const pendingMatches = await Match.findAll({
    where: {
      status: { [Op.ne]: 'FINISHED' },
      external_api_id: { [Op.not]: null },
      match_date: { [Op.lte]: new Date() } 
    }
  });

  if (pendingMatches.length === 0) {
    console.log('[CRON] No hay partidos pendientes para sincronizar en este momento.');
    return;
  }

  for (const match of pendingMatches) {
    const apiData = await sportsDbClient.getMatchDetails(match.external_api_id);

    if (apiData && (apiData.status === 'FT' || apiData.status === 'Match Finished')) {
      const transaction = await sequelize.transaction();
      
      try {

        match.home_score = apiData.home_score;
        match.away_score = apiData.away_score;
        match.status = 'FINISHED';
        await match.save({ transaction });


        const predictions = await Prediction.findAll({ 
          where: { match_id: match.id },
          transaction 
        });

        for (const pred of predictions) {
          const earnedPoints = calculatePoints(
            pred.home_prediction, pred.away_prediction, 
            match.home_score, match.away_score
          );
          
          pred.points_earned = earnedPoints;
          await pred.save({ transaction });

          await GroupMember.increment('total_points', {
            by: earnedPoints,
            where: { user_id: pred.user_id },
            transaction
          });
        }
        await transaction.commit();
        console.log(`[CRON] Partido ${match.home_team} vs ${match.away_team} procesado. Resultados actualizados.`);
      } catch (error) {
        await transaction.rollback();
        console.error(`[CRON] Error procesando partido ${match.id}:`, error);
      }
    }
  }
};

const startCronJob = () => {
  cron.schedule('*/20 * * * *', processMatches);
  console.log('⏱Proceso autónomo CRON activado (Sincronización cada 20 minutos).');
};

module.exports = { startCronJob };