import express from 'express';
import { handleAuthorization } from '../middleware/handleAuthorization';
import { UsersMongoDbRepository } from '../users/UsersMongoDbRepository';
import { TasksController } from './TasksController';
import { TasksInMemoryRepository } from './TasksInMemoryRepository';

const usersMongoDbRepository = UsersMongoDbRepository.instance;
const tasksRepository = TasksInMemoryRepository.instance;
const tasksController = new TasksController(tasksRepository);
const tasksRouter = express.Router();

// middleware
const auth = handleAuthorization(usersMongoDbRepository);

tasksRouter.get('/', auth, tasksController.getTasks);

export { tasksRouter };
