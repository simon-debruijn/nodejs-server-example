import { Collection } from 'mongodb';
import { Repository } from '../common/RepositoryInterface';
import { User } from './User';
import { MongoDbConnection } from '../db/MongoDbConnection';
import { ValidationErrorResponse } from '../common/ValidationErrorResponseInterface';

class UsersMongoDbRepository implements Repository<User> {
  private static _instance: UsersMongoDbRepository;
  private _users: Collection<User>;

  private constructor(mongoDbConnection: MongoDbConnection) {
    const collection = mongoDbConnection.getCollection('users');
    this._users = collection;
  }

  static getInstance(mongoDbConnection: MongoDbConnection) {
    if (!this._instance) {
      this._instance = new UsersMongoDbRepository(mongoDbConnection);
    }
    return this._instance;
  }

  async addOne(newInstance: any): Promise<User | ValidationErrorResponse> {
    const newUser = new User(newInstance);
    const validationErrors = User.validate(newUser);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await this._users.insertOne(newUser);
    return newUser;
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

    await this._users.insertMany(newUsers);
    return newUsers;
  }

  async findOneById(id: string): Promise<User | undefined> {
    return (await this._users.findOne({ _id: id })) ?? undefined;
  }

  async find(properties?: Partial<User>): Promise<User[]> {
    return await this._users.find(properties).toArray();
  }

  async deleteOneById(id: string): Promise<User | undefined> {
    return (await this._users.findOneAndDelete({ _id: id })).value;
  }

  async deleteManyByIds(ids: string[]): Promise<string> {
    const { deletedCount } = await this._users.deleteMany({
      _id: { $nin: ids },
    });
    return `${deletedCount} users were deleted`;
  }

  async updateOneById(
    id: string,
    properties: Partial<User>
  ): Promise<User | undefined> {
    const foundUser = await this._users.findOne({ _id: id });

    if (!foundUser) return undefined;

    return (
      await this._users.findOneAndUpdate(
        { _id: id },
        { ...foundUser, ...properties }
      )
    ).value;
  }

  async updateManyByIds(
    ids: string[],
    properties: Partial<User>
  ): Promise<string> {
    const { modifiedCount } = await this._users.updateMany(
      { _id: { $nin: ids } },
      properties
    );
    return `${modifiedCount} users were updated`;
  }
}

export { UsersMongoDbRepository };
