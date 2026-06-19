const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler, notFoundHandler } = require('./middlewares/error.middleware');

//rutas de la app
const authRoutes = require('./features/auth/auth.routes');
const userRoutes = require('./features/users/user.routes');
const groupRoutes = require('./features/groups/group.routes');
const matchRoutes = require('./features/matches/match.routes');
const predictionRoutes = require('./features/predictions/prediction.routes');
const dashboardRoutes = require('./features/dashboard/dashboard.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API funcionando' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/groups', groupRoutes);
app.use('/api/v1/matches', matchRoutes);
app.use('/api/v1/predictions', predictionRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;