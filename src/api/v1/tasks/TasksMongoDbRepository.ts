import { Collection } from 'mongodb';
import { Repository } from '../common/RepositoryInterface';
import { Task } from './Task';
import { MongoDbConnection } from '../db/mongo';
import { ValidationErrorResponse } from '../common/ValidationErrorResponseInterface';

class TasksMongoDbRepository implements Repository<Task> {
  private static _instance: TasksMongoDbRepository;
  private _tasks: Collection<Task>;

  private constructor() {
    const collection = MongoDbConnection.getInstance().getCollection('tasks');
    this._tasks = collection;
  }

  getInstance(): TasksMongoDbRepository {
    throw new Error('Method not implemented.');
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    return new TasksMongoDbRepository();
  }

  async addOne(newInstance: any): Promise<Task | ValidationErrorResponse> {
    const newTask = new Task(newInstance);
    const validationErrors = Task.validate(newTask);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await this._tasks.insertOne(newTask);
    return newTask;
  }

  async addMany(
    newInstances: any[]
  ): Promise<Task[] | ValidationErrorResponse> {
    const newTasks = newInstances.map((newInstance) => new Task(newInstance));
    const validationErrors = newTasks.reduce((previous, current) => {
      return [...previous, ...Task.validate(current)];
    }, []);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await this._tasks.insertMany(newTasks);
    return newTasks;
  }

  async findOneById(id: string): Promise<Task | undefined> {
    return (await this._tasks.findOne({ _id: id })) ?? undefined;
  }

  async find(properties?: Partial<Task>): Promise<Task[]> {
    return await this._tasks.find(properties).toArray();
  }

  async deleteOneById(id: string): Promise<Task | undefined> {
    return (await this._tasks.findOneAndDelete({ _id: id })).value;
  }

  async deleteManyByIds(ids: string[]): Promise<string> {
    const { deletedCount } = await this._tasks.deleteMany({
      _id: { $nin: ids },
    });
    return `${deletedCount} tasks were deleted`;
  }

  async updateOneById(
    id: string,
    properties: Partial<Task>
  ): Promise<Task | undefined> {
    const foundTask = await this._tasks.findOne({ _id: id });

    if (!foundTask) return undefined;

    return (
      await this._tasks.findOneAndUpdate(
        { _id: id },
        { ...foundTask, ...properties }
      )
    ).value;
  }

  async updateManyByIds(
    ids: string[],
    properties: Partial<Task>
  ): Promise<string> {
    const { modifiedCount } = await this._tasks.updateMany(
      { _id: { $nin: ids } },
      properties
    );
    return `${modifiedCount} tasks were updated`;
  }
}

export { TasksMongoDbRepository };
