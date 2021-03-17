import express, { Router } from 'express';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserController } from './UserController';

class UserRouter {
  router: Router;

  constructor() {
    const userRepository = new InMemoryUserRepository();
    const userController = new UserController(userRepository);
    const userRouter = express.Router();

    userRouter.get('/users', userController.getUsers);
    userRouter.get('/users/:id', userController.getUserById);

    userRouter.put('/users', userController.updateUsersByIds);
    userRouter.put('/users/:id', userController.updateUserById);

    userRouter.post('/users', userController.addUser);

    this.router = userRouter;
  }
}

export { UserRouter };
