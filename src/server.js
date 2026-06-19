const app = require('./app');
const config = require('./config/env.config');
const { sequelize, testConnection } = require('./database/connection');
require('./database/associations');
const { startCronJob } = require('./cron/syncMatches.cron');

const startServer = async () => {
  try {
    await testConnection();
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente en PostgreSQL.');

    startCronJob();

    app.listen(config.port, () => {
      console.log(`Servidor corriendo en el puerto ${config.port}`);
      console.log(`Entorno: ${config.env}`);
    });
  } catch (error) {
    console.error('Error fatal al iniciar el servidor:', error);
  }
};

startServer();