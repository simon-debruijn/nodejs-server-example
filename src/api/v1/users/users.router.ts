import express from 'express';
import { UsersInMemoryService } from './users.inMemory.service';
import { UsersController } from './users.controller';

const usersRepository = new UsersInMemoryService();
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
