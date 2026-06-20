const config = require('../config/env.config');

class TheSportsDbClient {
  constructor() {
    this.apiKey = config.sportsDb.apiKey;
    this.baseUrl = `https://www.thesportsdb.com/api/v1/json/${this.apiKey}`;
  }

  async getMatchDetails(externalApiId) {
    try {
      const response = await fetch(`${this.baseUrl}/lookupevent.php?id=${externalApiId}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.events || data.events.length === 0) {
        return null;
      }

      const event = data.events[0];
      
      return {
        home_score: event.intHomeScore !== null ? parseInt(event.intHomeScore) : null,
        away_score: event.intAwayScore !== null ? parseInt(event.intAwayScore) : null,
        status: event.strStatus
      };
    } catch (error) {
      console.error(`[Integrations] Fallo de conexión con TheSportsDB: ${error.message}`);
      return null;
    }
  }
}

module.exports = new TheSportsDbClient();