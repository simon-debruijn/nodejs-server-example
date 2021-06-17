import { Repository } from '../common/RepositoryInterface';
import { ValidationErrorResponse } from '../common/ValidationErrorResponseInterface';
import { Task } from './Task';

class TasksInMemoryRepository implements Repository<Task> {
  private _tasks: Task[] = [];

  private constructor() {}

  static instance: TasksInMemoryRepository = new TasksInMemoryRepository();

  addOne = async (
    newInstance: Task
  ): Promise<Task | ValidationErrorResponse> => {
    const newTask = new Task(newInstance);
    const validationErrors = Task.validate(newTask);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    this._tasks.push(newInstance);
    return newInstance;
  };

  addMany = async (newInstances: Task[]): Promise<Task[]> => {
    this._tasks.push(...newInstances);
    return newInstances;
  };

  findOneById = async (id: string): Promise<Task | undefined> => {
    return this._tasks.find((task) => task._id === id);
  };

  find = async (properties: Partial<Task> = {}): Promise<Task[]> => {
    const matchesProperties = (task: Task) =>
      Object.entries(properties).every(([key, value]) => task[key] === value);

    const foundTasks = this._tasks.filter(matchesProperties);

    return foundTasks;
  };

  deleteOneById = async (id: string): Promise<Task | undefined> => {
    const foundTask = this._tasks.find((task) => task._id === id);
    this._tasks = this._tasks.filter((task) => task._id !== id);
    return foundTask;
  };

  deleteManyByIds = async (ids: string[]): Promise<string> => {
    const deletedIdsSet = new Set(ids);

    this._tasks = this._tasks.filter((task) => !deletedIdsSet.has(task._id));

    return `${deletedIdsSet.size} tasks were deleted`;
  };

  updateOneById = async (
    id: string,
    properties: Partial<Task>
  ): Promise<Task | undefined> => {
    const foundTask = this._tasks.find((task) => task._id === id);

    if (!foundTask) return;

    const updatedTask = { ...foundTask, ...properties };

    this._tasks = this._tasks.map((task) =>
      task._id === id ? updatedTask : task
    );

    return updatedTask;
  };

  updateManyByIds = async (
    ids: string[],
    properties: Partial<Task>
  ): Promise<string> => {
    const updatedIdsSet = new Set(ids);

    const newTasks = this._tasks.map((task) =>
      ids.includes(task._id) ? { ...task, ...properties } : task
    );

    this._tasks = newTasks;

    return `${updatedIdsSet} tasks were updated`;
  };
}

export { TasksInMemoryRepository };
