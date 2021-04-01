import express from 'express';
import { tasksRouter } from './tasks/tasks.router';
import { usersRouter } from './users/users.router';

const v1Router = express.Router();

v1Router.use('/users', usersRouter);
v1Router.use('/tasks', tasksRouter);

export { v1Router };
