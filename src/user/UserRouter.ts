import express, { Router } from 'express';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserController } from './UserController';

class UserRouter {
  router: Router;

  constructor() {
    const userRepository = new InMemoryUserRepository();
    const userController = new UserController(userRepository);
    const userRouter = express.Router();

    // CREATE
    userRouter.post('/users', userController.addUser);

    // READ
    userRouter.get('/users', userController.getUsers);
    userRouter.get('/users/:id', userController.getUserById);

    // UPDATE
    userRouter.put('/users', userController.updateUsersByIds);
    userRouter.put('/users/:id', userController.updateUserById);

    // DELETE
    userRouter.delete('/users', userController.deleteUsersByIds);
    userRouter.delete('/users/:id', userController.deleteUserById);

    this.router = userRouter;
  }
}

export { UserRouter };
