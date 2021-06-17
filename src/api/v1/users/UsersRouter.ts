import express from 'express';
import { UsersController } from './UsersController';
import { UsersMongoDbRepository } from './UsersMongoDbRepository';

const usersRepository = UsersMongoDbRepository.instance;
const usersController = new UsersController(usersRepository);
const usersRouter = express.Router();

usersRouter.post('/', usersController.addUser);
usersRouter.post('/login', usersController.loginUser);

// usersRouter.get('/', usersController.getUsers);
// usersRouter.get('/:id', usersController.getUserById);

// usersRouter.patch('/', usersController.updateUsersByIds);
// usersRouter.patch('/:id', usersController.updateUserById);

// usersRouter.delete('/', usersController.deleteUsersByIds);
// usersRouter.delete('/:id', usersController.deleteUserById);

export { usersRouter };
