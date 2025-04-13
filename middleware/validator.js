const Joi = require('joi');

const mongoose = require('mongoose');

// Middleware to validate request body using Joi
const validateRequest = (schema) => {
    return (req, res, next) => {
        
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
// Middleware to validate ObjectId in request parameters
const validateObjectId = () => {
    return (req, res, next) => {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Task ID' });
        }
        next();
    };
};

// Validation schemas using Joi
const schemas = {
    // Schema for creating a task
    createTask: Joi.object({
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().max(500).required(),
        
        
    }),

    // Schema for updating a task
    updateTask: Joi.object({
        title: Joi.string().min(3).max(100),
        description: Joi.string().max(500),
        status: Joi.string().valid('pending', 'in-progress', 'completed'),
        
    }),
    // Schema for updating task status
    updateStatus: Joi.object({
        status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
    }),
};

module.exports = {
    validateRequest,
    validateObjectId,
    schemas,
};