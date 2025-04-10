const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const taskRoutes = require('./routes/taskRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
// app.use('/api/tasks', taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;
