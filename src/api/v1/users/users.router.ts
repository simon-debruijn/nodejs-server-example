import express from 'express';
import { UsersInMemoryService } from './users.inMemory.service';
import { UsersController } from './users.controller';

const usersRepository = new UsersInMemoryService();
const usersController = new UsersController(usersRepository);
const usersRouter = express.Router();

// CREATE
usersRouter.post('/', usersController.addUser);

// READ
usersRouter.get('/:id', usersController.getUserById);
usersRouter.get('/', usersController.getUsers);

// UPDATE
usersRouter.patch('/:id', usersController.updateUserById);
usersRouter.patch('/', usersController.updateUsersByIds);

// DELETE
usersRouter.delete('/:id', usersController.deleteUserById);
usersRouter.delete('/', usersController.deleteUsersByIds);

export { usersRouter };
