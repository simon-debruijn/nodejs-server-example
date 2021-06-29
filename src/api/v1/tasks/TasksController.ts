import type { Request, Response } from 'express';

import type { Repository } from '../common/RepositoryInterface';
import type { Task } from './Task';

class TasksController {
  private _repository: Repository<Task>;

  constructor(repository: Repository<Task>) {
    this._repository = repository;
  }

  async addTask(req: Request, res: Response) {
    const task = req.body;

    const result = await this._repository.addOne(task);

    if ('error' in result) {
      return res.status(400).send({ error: result.error });
    }

    res.status(201).send({ task: result });
  }

  async getTasks(req: Request, res: Response) {
    const parameters = req.body;
    const tasks = await this._repository.find(parameters);
    res.status(200).send({ tasks });
  }

  async getTaskById(req: Request, res: Response) {
    const { id } = req.params;
    const task = await this._repository.findOneById(id);

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200).send({ task });
  }

  async updateTaskById(req: Request, res: Response) {
    const { id } = req.params;
    const properties = req.body;
    const task = await this._repository.updateOneById(id, properties);

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200).send({ task });
  }

  async updateTasksByIds(req: Request, res: Response) {
    const { ids, properties } = req.body;
    const statusMessage = await this._repository.updateManyByIds(
      ids,
      properties
    );
    res.status(200).send(statusMessage);
  }

  async deleteTaskById(req: Request, res: Response) {
    const { id } = req.params;
    const task = await this._repository.deleteOneById(id);

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200).send({ task });
  }

  async deleteTasksByIds(req: Request, res: Response) {
    const { ids } = req.body;
    const statusMessage = await this._repository.deleteManyByIds(ids);
    res.status(200).send(statusMessage);
  }
}

export { TasksController };
