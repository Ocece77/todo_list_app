import express from 'express';
import { deleteTask, getTasks, postTask, putTask } from '../controllers/task.controller.js';
import { } from '../middleware/auth.js';


const taskRoutes = express.Router();

taskRoutes.get('/get', getTasks);
taskRoutes.post('/post', postTask);
taskRoutes.put('/put/:id', putTask);
taskRoutes.delete('/delete/:id', deleteTask);

export default taskRoutes;
