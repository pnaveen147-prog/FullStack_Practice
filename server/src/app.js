const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/user.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/users', userRoutes);
app.use(errorMiddleware);

module.exports = app;