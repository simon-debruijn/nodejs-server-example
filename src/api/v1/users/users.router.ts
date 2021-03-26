import express from 'express';
import { UsersInMemoryRepository } from './users.in-memory.repository';
import { UsersController } from './users.controller';

const usersRepository = new UsersInMemoryRepository();
const usersController = new UsersController(usersRepository);
const usersRouter = express.Router();

// CREATE
usersRouter.post('/', usersController.addUser);

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
