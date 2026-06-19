const matchService = require('./match.service');

const createNewMatch = async (req, res, next) => {
  try {
    const matchData = req.body;
    const match = await matchService.createMatch(matchData);
    
    res.status(201).json({
      status: 'success',
      message: 'Partido creado exitosamente',
      data: { match },
    });
  } catch (error) {
    next(error);
  }
};

const getAllMatches = async (req, res, next) => {
  try {
    const { status } = req.query;
    
    const matches = await matchService.getMatches({ status });
    
    res.status(200).json({
      status: 'success',
      results: matches.length,
      data: { matches },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleMatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const match = await matchService.getMatchById(id);
    
    res.status(200).json({
      status: 'success',
      data: { match },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createNewMatch, getAllMatches, getSingleMatch };