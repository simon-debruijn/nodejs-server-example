import { Request, Response } from 'express';
import { RepositoryInterface } from '../repository/RepositoryInterface';
import { User } from './User';

class UserController {
  private _repository: RepositoryInterface<User>;

  constructor(repository: RepositoryInterface<User>) {
    this._repository = repository;
  }

  addUser = async (req: Request, res: Response) => {
    try {
      const newUser = req.body;
      await this._repository.addOne(newUser);
      res.status(200).send({ newUser });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const parameters = req.body;
      const users = await this._repository.find(parameters);
      res.status(200).send({ users });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this._repository.findOneById(id);
      res.status(200).send({ user });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };

  updateUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const properties = req.body;
      const user = await this._repository.updateOneById(id, properties);
      res.status(200).send({ user });
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: error.message });
    }
  };

  updateUsersByIds = async (req: Request, res: Response) => {
    try {
      const { ids, properties } = req.body;
      const users = await this._repository.updateManyByIds(ids, properties);
      res.status(200).send({ users });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };
}

export { UserController };
