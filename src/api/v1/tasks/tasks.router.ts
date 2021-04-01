import express from 'express';
import { handleAuthorization } from '../middleware/handle-authorization.middleware';
import { UsersInMemoryRepository } from '../users/users.in-memory.repository';
import { TasksController } from './tasks.controller';
import { TasksInMemoryRepository } from './tasks.in-memory.repository';

const usersRepository = UsersInMemoryRepository.getInstance();
const tasksRepository = new TasksInMemoryRepository();
const tasksController = new TasksController(tasksRepository);
const tasksRouter = express.Router();

// middleware
const auth = handleAuthorization(usersRepository);

// READ
tasksRouter.get('/', auth, tasksController.getTasks);

export { tasksRouter };
