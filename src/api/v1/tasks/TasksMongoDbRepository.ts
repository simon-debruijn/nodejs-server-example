import type { Collection } from 'mongodb';

import type { Repository } from '../common/RepositoryInterface';
import type { ValidationErrorResponse } from '../common/ValidationErrorResponseInterface';
import type { MongoDbConnection } from '../db/MongoDbConnection';
import { Task } from './Task';

class TasksMongoDbRepository implements Repository<Task> {
  private static _instance: TasksMongoDbRepository;
  private _tasks: Collection<Task>;

  private constructor(mongoDbConnection: MongoDbConnection) {
    this._tasks = mongoDbConnection.getCollection('tasks');
  }

  static getInstance = (mongoDbConnection: MongoDbConnection) => {
    if (!TasksMongoDbRepository._instance) {
      TasksMongoDbRepository._instance = new TasksMongoDbRepository(
        mongoDbConnection
      );
    }
    return TasksMongoDbRepository._instance;
  };

  addOne = async (
    newInstance: any
  ): Promise<Task | ValidationErrorResponse> => {
    const newTask = new Task(newInstance);
    const validationErrors = Task.validate(newTask);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await this._tasks.insertOne(newTask);
    return newTask;
  };

  addMany = async (
    newInstances: any[]
  ): Promise<Task[] | ValidationErrorResponse> => {
    const newTasks = newInstances.map((newInstance) => new Task(newInstance));
    const validationErrors = newTasks.reduce((previous, current) => {
      return [...previous, ...Task.validate(current)];
    }, []);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await this._tasks.insertMany(newTasks);
    return newTasks;
  };

  findOneById = async (id: string): Promise<Task | undefined> => {
    return (await this._tasks.findOne({ _id: id })) ?? undefined;
  };

  find = async (properties?: Partial<Task>): Promise<Task[]> => {
    return await this._tasks.find(properties).toArray();
  };

  deleteOneById = async (id: string): Promise<Task | undefined> => {
    return (await this._tasks.findOneAndDelete({ _id: id })).value;
  };

  deleteManyByIds = async (ids: string[]): Promise<string> => {
    const { deletedCount } = await this._tasks.deleteMany({
      _id: { $nin: ids },
    });
    return `${deletedCount} tasks were deleted`;
  };

  updateOneById = async (
    id: string,
    properties: Partial<Task>
  ): Promise<Task | undefined> => {
    const foundTask = await this._tasks.findOne({ _id: id });

    if (!foundTask) return undefined;

    return (
      await this._tasks.findOneAndUpdate(
        { _id: id },
        { ...foundTask, ...properties }
      )
    ).value;
  };

  updateManyByIds = async (
    ids: string[],
    properties: Partial<Task>
  ): Promise<string> => {
    const { modifiedCount } = await this._tasks.updateMany(
      { _id: { $nin: ids } },
      properties
    );
    return `${modifiedCount} tasks were updated`;
  };
}

export { TasksMongoDbRepository };
