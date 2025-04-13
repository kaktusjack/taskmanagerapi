const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');
const {validateRequest,validateObjectId,schemas}=require('../middleware/validator.js');

router.get('/', taskController.getAllTasks);
router.get('/:id',validateObjectId(), taskController.getTaskById);
router.post('/',validateRequest(schemas.createTask), taskController.createTask);
router.put('/:id',validateObjectId(),validateRequest(schemas.updateTask), taskController.updateTask);
router.delete('/:id',validateObjectId(), taskController.deleteTask);
router.patch('/:id',validateObjectId(),validateRequest(schemas.updateStatus) ,taskController.updateStatus);

module.exports = router;