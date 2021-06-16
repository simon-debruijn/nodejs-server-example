import { Collection } from 'mongodb';
import { Repository } from '../common/RepositoryInterface';
import { Task } from './Task';
import { MongoDbConnection } from '../db/mongo';

class TasksMongoDbRepository implements Repository<Task> {
  private _tasks: Collection<Task>;

  private constructor() {
    const collection = MongoDbConnection.getCollection('tasks');
    this._tasks = collection;
  }

  static instance: TasksMongoDbRepository = new TasksMongoDbRepository();

  addOne(newInstance: Task): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  addMany(newInstances: Task[]): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<Task | undefined> {
    throw new Error('Method not implemented.');
  }
  find = async (properties?: Partial<Task>): Promise<Task[]> => {
    return await this._tasks.find(properties).toArray();
  };
  deleteOneById(id: string): Promise<Task | undefined> {
    throw new Error('Method not implemented.');
  }
  deleteManyByIds(ids: string[]): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
  updateOneById(
    id: string,
    properties: Partial<Task>
  ): Promise<Task | undefined> {
    throw new Error('Method not implemented.');
  }
  updateManyByIds(ids: string[], properties: Partial<Task>): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
}

export { TasksMongoDbRepository };
