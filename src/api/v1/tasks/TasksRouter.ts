import express from 'express';

import { MongoDbConnection } from '../db/MongoDbConnection';
import { TasksController } from './TasksController';
import { TasksMongoDbRepository } from './TasksMongoDbRepository';

const tasksRepository = TasksMongoDbRepository.getInstance(
  MongoDbConnection.getInstance()
);
const tasksController = new TasksController(tasksRepository);
const tasksRouter = express.Router();

tasksRouter.post('/', tasksController.addTask);

tasksRouter.get('/', tasksController.getTasks);
tasksRouter.get('/:id', tasksController.getTaskById);

tasksRouter.patch('/', tasksController.updateTasksByIds);
tasksRouter.patch('/:id', tasksController.updateTaskById);

tasksRouter.delete('/', tasksController.deleteTasksByIds);
tasksRouter.delete('/:id', tasksController.deleteTaskById);

export { tasksRouter };
