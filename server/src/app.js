const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes')
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes)
app.use(errorMiddleware);

module.exports = app;