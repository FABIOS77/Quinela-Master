const { Match } = require('../../database/associations');
const { Op } = require('sequelize');

const createMatch = async (matchData) => {
  const newMatch = await Match.create(matchData);
  return newMatch;
};

const getMatches = async (filters = {}) => {
  const whereClause = {};

  if (filters.status) whereClause.status = filters.status;

  if (filters.phase) whereClause.phase = filters.phase;

  if (filters.date) {
    const startDate = new Date(filters.date);
    startDate.setUTCHours(0, 0, 0, 0);
    
    const endDate = new Date(filters.date);
    endDate.setUTCHours(23, 59, 59, 999);
    
    whereClause.match_date = {
      [Op.between]: [startDate, endDate]
    };
  }
  const matches = await Match.findAll({
    where: whereClause,
    order: [['match_date', 'ASC']],
  });

  return matches;
};

const getMatchById = async (matchId) => {
  const match = await Match.findByPk(matchId);
  if (!match) {
    const error = new Error('Partido no encontrado');
    error.statusCode = 404;
    throw error;
  }
  return match;
};
const updateMatch = async (matchId, updateData) => {
  const match = await Match.findByPk(matchId);
  if (!match) {
    const error = new Error('Partido no encontrado');
    error.statusCode = 404;
    throw error;
  }

  // REGLA DE NEGOCIO REQ 27: No se puede modificar el resultado manualmente.
  // Eliminamos preventivamente cualquier intento de alterar el score.
  delete updateData.home_score;
  delete updateData.away_score;
  delete updateData.status; 

  await match.update(updateData);
  return match;
};

module.exports = { createMatch, getMatches, getMatchById, updateMatch };