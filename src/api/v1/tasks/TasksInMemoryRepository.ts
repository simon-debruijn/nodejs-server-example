import { Repository } from '../common/RepositoryInterface';
import { ValidationErrorResponse } from '../common/ValidationErrorResponseInterface';
import { Task } from './Task';

class TasksInMemoryRepository implements Repository<Task> {
  private _tasks: Task[] = [];

  private constructor() {}

  static instance: TasksInMemoryRepository = new TasksInMemoryRepository();

  async addOne(newInstance: Task): Promise<Task | ValidationErrorResponse> {
    const newTask = new Task(newInstance);
    const validationErrors = Task.validate(newTask);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    this._tasks.push(newInstance);
    return newInstance;
  }

  async addMany(
    newInstances: Task[]
  ): Promise<Task[] | ValidationErrorResponse> {
    const newTasks = newInstances.map((newInstance) => new Task(newInstance));
    const validationErrors = newTasks.reduce((previous, current) => {
      return [...previous, ...Task.validate(current)];
    }, []);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    this._tasks.push(...newInstances);
    return newInstances;
  }

  async findOneById(id: string): Promise<Task | undefined> {
    return this._tasks.find((task) => task._id === id);
  }

  async find(properties: Partial<Task> = {}): Promise<Task[]> {
    const matchesProperties = (task: Task) =>
      Object.entries(properties).every(([key, value]) => task[key] === value);

    const foundTasks = this._tasks.filter(matchesProperties);

    return foundTasks;
  }

  async deleteOneById(id: string): Promise<Task | undefined> {
    const foundTask = this._tasks.find((task) => task._id === id);
    this._tasks = this._tasks.filter((task) => task._id !== id);
    return foundTask;
  }

  async deleteManyByIds(ids: string[]): Promise<string> {
    const deletedIdsSet = new Set(ids);

    this._tasks = this._tasks.filter((task) => !deletedIdsSet.has(task._id));

    return `${deletedIdsSet.size} tasks were deleted`;
  }

  async updateOneById(
    id: string,
    properties: Partial<Task>
  ): Promise<Task | undefined> {
    const foundTask = this._tasks.find((task) => task._id === id);

    if (!foundTask) return;

    const updatedTask = { ...foundTask, ...properties };

    this._tasks = this._tasks.map((task) =>
      task._id === id ? updatedTask : task
    );

    return updatedTask;
  }

  async updateManyByIds(
    ids: string[],
    properties: Partial<Task>
  ): Promise<string> {
    const updatedIdsSet = new Set(ids);

    const newTasks = this._tasks.map((task) =>
      ids.includes(task._id) ? { ...task, ...properties } : task
    );

    this._tasks = newTasks;

    return `${updatedIdsSet} tasks were updated`;
  }
}

export { TasksInMemoryRepository };
