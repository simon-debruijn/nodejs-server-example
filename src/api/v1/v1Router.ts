import express from 'express';
import { tasksRouter } from './tasks/TasksRouter';
import { usersRouter } from './users/UsersRouter';
import { createAuthorizationHandler } from './middleware/createAuthorizationHandler';
import { UsersMongoDbRepository } from './users/UsersMongoDbRepository';
import { MongoDbConnection } from './db/MongoDbConnection';

const v1Router = express.Router();

const usersRepository = UsersMongoDbRepository.getInstance(
  MongoDbConnection.getInstance()
);
const handleAuthorization = createAuthorizationHandler(usersRepository);

v1Router.use('/users', usersRouter);
v1Router.use('/tasks', handleAuthorization, tasksRouter);

export { v1Router };
