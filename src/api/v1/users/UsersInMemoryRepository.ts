import { Repository } from '../common/RepositoryInterface';
import { ValidationErrorResponse } from '../common/ValidationErrorResponseInterface';
import { User } from './User';

class UsersInMemoryRepository implements Repository<User> {
  private static _instance: UsersInMemoryRepository;
  private _users: User[] = [];

  private constructor() {}

  static getInstance() {
    if (!this._instance) {
      this._instance = new UsersInMemoryRepository();
    }
    return this._instance;
  }

  async addOne(newInstance: any): Promise<User | ValidationErrorResponse> {
    const newUser = new User(newInstance);
    const validationErrors = User.validate(newUser);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    this._users.push(newInstance);
    return newInstance;
  }

  async addMany(
    newInstances: any[]
  ): Promise<User[] | ValidationErrorResponse> {
    const newUsers = newInstances.map((newInstance) => new User(newInstance));
    const validationErrors = newUsers.reduce((previous, current) => {
      return [...previous, ...User.validate(current)];
    }, []);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    this._users.push(...newInstances);
    return newInstances;
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this._users.find((user) => user._id === id);
  }

  async find(properties: Partial<User> = {}): Promise<User[]> {
    const matchesProperties = (user: User) =>
      Object.entries(properties).every(([key, value]) => user[key] === value);

    const foundUsers = this._users.filter(matchesProperties);

    return foundUsers;
  }

  async deleteOneById(id: string): Promise<User | undefined> {
    const foundUser = this._users.find((user) => user._id === id);
    this._users = this._users.filter((user) => user._id !== id);
    return foundUser;
  }

  async deleteManyByIds(ids: string[]): Promise<string> {
    const deletedIdsSet = new Set(ids);

    this._users = this._users.filter((user) => !deletedIdsSet.has(user._id));

    const deletedCount = deletedIdsSet.size;

    return `${deletedCount} users were deleted`;
  }

  async updateOneById(
    id: string,
    properties: Partial<User>
  ): Promise<User | undefined> {
    const foundUser = this._users.find((user) => user._id === id);

    if (!foundUser) return;

    const updatedUser = { ...foundUser, ...properties };

    this._users = this._users.map((user) =>
      user._id === id ? updatedUser : user
    );

    return updatedUser;
  }

  async updateManyByIds(
    ids: string[],
    properties: Partial<User>
  ): Promise<string> {
    const updatedIdsSet = new Set(ids);

    const newUsers = this._users.map((user) =>
      ids.includes(user._id) ? { ...user, ...properties } : user
    );

    this._users = newUsers;

    return `${updatedIdsSet.size} users have been updated`;
  }
}
export { UsersInMemoryRepository };
