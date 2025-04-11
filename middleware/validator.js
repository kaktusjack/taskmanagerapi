const Joi = require('joi');
const { updateStatus } = require('../controllers/taskController');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

const schemas = {
    createTask: Joi.object({
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().max(500),
        
        
    }),
    updateTask: Joi.object({
        title: Joi.string().min(3).max(100),
        description: Joi.string().max(500),
        status: Joi.string().valid('pending', 'in-progress', 'completed'),
        
    }),
    updateStatus: Joi.object({
        status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
    }),
};

module.exports = {
    validateRequest,
    schemas,
};