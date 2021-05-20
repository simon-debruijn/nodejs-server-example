import express from 'express';
import { UsersController } from './UsersController';
import { UsersMongoDbRepository } from './UsersMongoDbRepository';

const usersRepository = UsersMongoDbRepository.getInstance();
const usersController = new UsersController(usersRepository);
const usersRouter = express.Router();

// CREATE
usersRouter.post('/', usersController.addUser);
usersRouter.post('/login', usersController.loginUser);

// READ
usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:id', usersController.getUserById);

// UPDATE
usersRouter.patch('/', usersController.updateUsersByIds);
usersRouter.patch('/:id', usersController.updateUserById);

// DELETE
usersRouter.delete('/', usersController.deleteUsersByIds);
usersRouter.delete('/:id', usersController.deleteUserById);

export { usersRouter };
