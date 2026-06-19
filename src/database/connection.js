const { Sequelize } = require('sequelize');
const config = require('../config/env.config');


const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres',
  logging: config.env === 'development' ? console.log : false, 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida correctamente crack.');
  } catch (error) {
    console.error('Error al conectar con PostgreSQL mi vibecoder:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, testConnection };