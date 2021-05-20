import express from 'express';
import { tasksRouter } from './tasks/TasksRouter';
import { usersRouter } from './users/UsersRouter';

const v1Router = express.Router();

v1Router.use('/users', usersRouter);
v1Router.use('/tasks', tasksRouter);

export { v1Router };
