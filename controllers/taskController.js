const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        // Pagination
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        // Filtering
        const filter = {};
        if (req.query.status) {
            filter.status = req.query.status;
        }
       

        // Sorting
        let sort = {};
        if (req.query.sortBy) {
            const [field, order] = req.query.sortBy.split(':');
            sort[field] = order === 'desc' ? -1 : 1;
        } else {
            sort = { createdAt: -1 };
        }

        const tasks = await Task.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const total = await Task.countDocuments(filter);
        console.log('Sort order:', sort);
        console.log('First task:', tasks[0]);   

        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            tasks
        });
        

    } catch (error) {
        console.error('Error in getAllTasks:', error); 
        res.status(500).json({ message: error.message });
    }
};


// Get a single task
const getTaskById = async (req, res) => {
    try {
       
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update task status
const updateStatus = async (req, res) => {
    try {
        
        const task = await Task.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
       
        return res.status(200).json({ message: `Status is  set to ${req.body.status}` });
       
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateStatus
};