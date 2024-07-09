import express from 'express';
import { deleteTask, getTasks, postTask, putTask } from '../controllers/task.controller.js';
import { authToken } from '../middleware/auth.js';

const taskRoutes = express.Router();

taskRoutes.get('/get', getTasks);
taskRoutes.post('/post', authToken, postTask);
taskRoutes.put('/put/:id', authToken, putTask);
taskRoutes.delete('/delete/:id', authToken, deleteTask);

export default taskRoutes;
