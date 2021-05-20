import { Repository } from '../common/RepositoryInterface';
import { Task } from './TaskInterface';

class TasksInMemoryRepository implements Repository<Task> {
  private _tasks: Task[] = [
    {
      _id: '1',
      description: 'Task 1',
      completed: false,
    },
  ];

  addOne(newInstance: Task): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  addMany(newInstances: Task[]): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<Task | undefined> {
    throw new Error('Method not implemented.');
  }
  async find(properties?: Partial<Task>): Promise<Task[]> {
    return await this._tasks;
  }
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

export { TasksInMemoryRepository };
