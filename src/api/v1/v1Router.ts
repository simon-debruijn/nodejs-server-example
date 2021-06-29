import express from 'express';

import { MongoDbConnection } from './db/MongoDbConnection';
import { createAuthorizationHandler } from './middleware/createAuthorizationHandler';
import { tasksRouter } from './tasks/TasksRouter';
import { UsersMongoDbRepository } from './users/UsersMongoDbRepository';
import { usersRouter } from './users/UsersRouter';

const v1Router = express.Router();

const usersRepository = UsersMongoDbRepository.getInstance(
  MongoDbConnection.getInstance()
);
const handleAuthorization = createAuthorizationHandler(usersRepository);

v1Router.use('/users', usersRouter);
v1Router.use('/tasks', handleAuthorization, tasksRouter);

export { v1Router };
