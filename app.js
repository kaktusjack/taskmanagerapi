const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes.js');
const swaggerUi = require('swagger-ui-express');
const  swaggerDocs = require('./swagger');
const YAML = require("yamljs");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/tasks', taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;
