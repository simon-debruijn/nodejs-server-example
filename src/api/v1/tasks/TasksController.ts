import { Request, Response } from 'express';
import { Repository } from '../common/RepositoryInterface';
import { Task } from './Task';

class TasksController {
  private _repository: Repository<Task>;

  constructor(repository: Repository<Task>) {
    this._repository = repository;
  }

  addTask = async (req: Request, res: Response) => {
    const task = req.body;

    const result = await this._repository.addOne(task);

    if ('error' in result) {
      return res.status(400).send({ error: result.error });
    }

    res.status(201).send({ task: result });
  };

  getTasks = async (req: Request, res: Response) => {
    const parameters = req.body;
    const tasks = await this._repository.find(parameters);
    res.status(200).send({ tasks });
  };

  getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await this._repository.findOneById(id);

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200).send({ task });
  };

  updateTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const properties = req.body;
    const task = await this._repository.updateOneById(id, properties);

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200).send({ task });
  };

  updateTasksByIds = async (req: Request, res: Response) => {
    const { ids, properties } = req.body;
    const tasks = await this._repository.updateManyByIds(ids, properties);
    res.status(200).send({ tasks });
  };

  deleteTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await this._repository.deleteOneById(id);

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200).send({ task });
  };

  deleteTasksByIds = async (req: Request, res: Response) => {
    const { ids } = req.body;
    const tasks = await this._repository.deleteManyByIds(ids);
    res.status(200).send({ tasks });
  };
}

export { TasksController };
