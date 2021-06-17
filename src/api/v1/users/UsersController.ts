import { Request, Response } from 'express';
import { JwtProvider } from '../common/JwtProvider';
import { Repository } from '../common/RepositoryInterface';
import { User } from './User';

class UsersController {
  private _repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this._repository = repository;
  }

  addUser = async (req: Request, res: Response) => {
    const user = req.body;

    const result = await this._repository.addOne(user);

    if ('error' in result) {
      return res.status(400).send({ error: result.error });
    }

    res.status(201).send({ user: result });
  };

  loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const users = await this._repository.find({ email, password });
    const user = users?.[0];

    if (!user) {
      return res.status(400).send();
    }

    const token = JwtProvider.generateAuthToken(user);

    const updatedUser = await this._repository.updateOneById(user['_id'], {
      tokens: [...(user.tokens ?? []), token],
    });

    res.status(200).send({ user: updatedUser, token });
  };

  getUsers = async (req: Request, res: Response) => {
    const parameters = req.body;
    const users = await this._repository.find(parameters);
    res.status(200).send({ users });
  };

  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this._repository.findOneById(id);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send({ user });
  };

  updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const properties = req.body;
    const user = await this._repository.updateOneById(id, properties);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send({ user });
  };

  updateUsersByIds = async (req: Request, res: Response) => {
    const { ids, properties } = req.body;
    const statusMessage = await this._repository.updateManyByIds(
      ids,
      properties
    );
    res.status(200).send(statusMessage);
  };

  deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this._repository.deleteOneById(id);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send({ user });
  };

  deleteUsersByIds = async (req: Request, res: Response) => {
    const { ids } = req.body;
    const statusMessage = await this._repository.deleteManyByIds(ids);
    res.status(200).send(statusMessage);
  };
}

export { UsersController };
