import { Request, Response } from 'express';
import { Repository } from '../common/repository.interface';
import { Task } from './task.interface';

class TasksController {
  private _repository: Repository<Task>;

  constructor(repository: Repository<Task>) {
    this._repository = repository;
  }

  getTasks = async (req: Request, res: Response) => {
    try {
      const parameters = req.body;
      const tasks = await this._repository.find(parameters);
      res.status(200).send({ tasks });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };
}

export { TasksController };
