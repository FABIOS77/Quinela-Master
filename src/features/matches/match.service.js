const { Match } = require('../../database/associations');

const createMatch = async (matchData) => {
  const newMatch = await Match.create(matchData);
  return newMatch;
};

const getMatches = async (filters = {}) => {
  const whereClause = {};

  if (filters.status) {
    whereClause.status = filters.status;
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

module.exports = { createMatch, getMatches, getMatchById };