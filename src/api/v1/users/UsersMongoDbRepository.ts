import type { Collection } from 'mongodb';

import type { Repository } from '../common/RepositoryInterface';
import type { ValidationErrorResponse } from '../common/ValidationErrorResponseInterface';
import type { MongoDbConnection } from '../db/MongoDbConnection';
import { User } from './User';

class UsersMongoDbRepository implements Repository<User> {
  private static _instance: UsersMongoDbRepository;
  private _users: Collection<User>;

  private constructor(mongoDbConnection: MongoDbConnection) {
    this._users = mongoDbConnection.getCollection('users');
  }

  static getInstance = (mongoDbConnection: MongoDbConnection) => {
    if (!UsersMongoDbRepository._instance) {
      UsersMongoDbRepository._instance = new UsersMongoDbRepository(
        mongoDbConnection
      );
    }
    return UsersMongoDbRepository._instance;
  };

  addOne = async (
    newInstance: any
  ): Promise<User | ValidationErrorResponse> => {
    const newUser = new User(newInstance);
    const validationErrors = User.validate(newUser);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await this._users.insertOne(newUser);
    return newUser;
  };

  addMany = async (
    newInstances: any[]
  ): Promise<User[] | ValidationErrorResponse> => {
    const newUsers = newInstances.map((newInstance) => new User(newInstance));
    const validationErrors = newUsers.reduce((previous, current) => {
      return [...previous, ...User.validate(current)];
    }, []);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await this._users.insertMany(newUsers);
    return newUsers;
  };

  findOneById = async (id: string): Promise<User | undefined> => {
    return (await this._users.findOne({ _id: id })) ?? undefined;
  };

  find = async (properties?: Partial<User>): Promise<User[]> => {
    return await this._users.find(properties).toArray();
  };

  deleteOneById = async (id: string): Promise<User | undefined> => {
    return (await this._users.findOneAndDelete({ _id: id })).value;
  };

  deleteManyByIds = async (ids: string[]): Promise<string> => {
    const { deletedCount } = await this._users.deleteMany({
      _id: { $nin: ids },
    });
    return `${deletedCount} users were deleted`;
  };

  updateOneById = async (
    id: string,
    properties: Partial<User>
  ): Promise<User | undefined> => {
    const foundUser = await this._users.findOne({ _id: id });

    if (!foundUser) return undefined;

    return (
      await this._users.findOneAndUpdate(
        { _id: id },
        { ...foundUser, ...properties }
      )
    ).value;
  };

  updateManyByIds = async (
    ids: string[],
    properties: Partial<User>
  ): Promise<string> => {
    const { modifiedCount } = await this._users.updateMany(
      { _id: { $nin: ids } },
      properties
    );
    return `${modifiedCount} users were updated`;
  };
}

export { UsersMongoDbRepository };
