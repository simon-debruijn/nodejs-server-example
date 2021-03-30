import { Request, Response } from 'express';
import { Repository } from '../common/repository.interface';
import { User } from './user.interface';

class UsersController {
  private _repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this._repository = repository;
  }

  addUser = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      await this._repository.addOne(user);
      res.status(201).send({ user });
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

      if (!user) {
        console.log('HERE');

        return res.status(404).send({ message: 'User not found' });
      }

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

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).send({ user });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
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

  deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this._repository.deleteOneById(id);

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).send({ user });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };

  deleteUsersByIds = async (req: Request, res: Response) => {
    try {
      const { ids } = req.body;
      const users = await this._repository.deleteManyByIds(ids);
      res.status(200).send({ users });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };
}

export { UsersController };
