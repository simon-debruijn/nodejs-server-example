import { Collection } from 'mongodb';
import { Repository } from '../common/RepositoryInterface';
import { MongoDbConnection } from '../db/mongo';
import { User } from './User';

class UsersMongoDbRepository implements Repository<User> {
  private static _instance;

  private _users: Collection;

  private constructor(collection: Collection) {
    this._users = collection;
  }

  static getInstance = (): UsersMongoDbRepository => {
    if (!UsersMongoDbRepository._instance) {
      UsersMongoDbRepository._instance = new UsersMongoDbRepository();
    }
    return UsersMongoDbRepository._instance;
  };

  addOne(newInstance: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  addMany(newInstances: User[]): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  find = async (properties?: Partial<User>): Promise<User[]> => {
    return await this._users.find(properties).toArray();
  };
  deleteOneById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  deleteManyByIds(ids: string[]): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  updateOneById(
    id: string,
    properties: Partial<User>
  ): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  updateManyByIds(ids: string[], properties: Partial<User>): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}

export { UsersMongoDbRepository };
