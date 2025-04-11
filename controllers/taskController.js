const Task = require('../models/taskModel');

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
       
    } catch (error) {
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