import { Repository } from '../common/RepositoryInterface';
import { ValidationErrorResponse } from '../common/ValidationErrorResponseInterface';
import { User } from './User';

class UsersInMemoryRepository implements Repository<User> {
  private _users: User[] = [];

  private static _instance: UsersInMemoryRepository;

  private constructor() {}

  static getInstance = () => {
    if (!UsersInMemoryRepository._instance) {
      UsersInMemoryRepository._instance = new UsersInMemoryRepository();
    }
    return UsersInMemoryRepository._instance;
  };

  addOne = async (
    newInstance: User
  ): Promise<User | ValidationErrorResponse> => {
    const newUser = new User(
      newInstance.name,
      newInstance.email,
      newInstance.password
    );
    const validationErrors = User.validate(newUser);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await this._users.push(newInstance);
    return newInstance;
  };

  addMany = async (newInstances: User[]): Promise<User[]> => {
    await this._users.push(...newInstances);
    return newInstances;
  };

  findOneById = async (id: string): Promise<User | undefined> => {
    return await this._users.find((user) => user._id === id);
  };

  find = async (properties: Partial<User> = {}): Promise<User[]> => {
    const matchesProperties = (user: User) =>
      Object.entries(properties).every(([key, value]) => user[key] === value);

    const foundUsers = this._users.filter(matchesProperties);

    return foundUsers;
  };

  deleteOneById = async (id: string): Promise<User | undefined> => {
    const foundUser = await this._users.find((user) => user._id === id);
    this._users = await this._users.filter((user) => user._id !== id);
    return foundUser;
  };

  deleteManyByIds = async (ids: string[]): Promise<User[]> => {
    const updatedIdsSet = new Set(ids);

    const oldUsers = [...this._users];

    this._users = await this._users.filter(
      (user) => !updatedIdsSet.has(user._id)
    );

    return oldUsers.filter((user) => updatedIdsSet.has(user._id));
  };

  updateOneById = async (
    id: string,
    properties: Partial<User>
  ): Promise<User | undefined> => {
    const foundUser = await this._users.find((user) => user._id === id);

    if (!foundUser) return;

    const updatedUser = { ...foundUser, ...properties };

    this._users = this._users.map((user) =>
      user._id === id ? updatedUser : user
    );

    return updatedUser;
  };

  updateManyByIds = async (
    ids: string[],
    properties: Partial<User>
  ): Promise<User[]> => {
    const updatedIdsSet = new Set(ids);

    const newUsers = await this._users.map((user) =>
      ids.includes(user._id) ? { ...user, ...properties } : user
    );

    this._users = newUsers;

    return newUsers.filter((user) => updatedIdsSet.has(user._id));
  };
}
export { UsersInMemoryRepository };
