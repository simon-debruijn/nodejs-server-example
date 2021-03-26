import express from 'express';
import { usersRouter } from './users/users.router';

const v1Router = express.Router();

v1Router.use('/users', usersRouter);

export { v1Router };
