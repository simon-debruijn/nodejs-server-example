import express, { Router } from 'express';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserController } from './UserController';

class UserRouter {
  router: Router;

  constructor() {
    const userRepository = new InMemoryUserRepository();
    const userController = new UserController(userRepository);
    const userRouter = express.Router();

    // GET
    userRouter.get('/users', userController.getUsers);
    userRouter.get('/users/:id', userController.getUserById);

    // PUT
    userRouter.put('/users', userController.updateUsersByIds);
    userRouter.put('/users/:id', userController.updateUserById);

    // POST
    userRouter.post('/users', userController.addUser);

    // DELETE
    userRouter.delete('/users', userController.deleteUsersByIds);
    userRouter.delete('/users/:id', userController.deleteUserById);

    this.router = userRouter;
  }
}

export { UserRouter };
