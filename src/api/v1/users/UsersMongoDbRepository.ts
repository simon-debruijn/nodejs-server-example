import { Collection } from 'mongodb';
import { Repository } from '../common/RepositoryInterface';
import { User } from './User';
import { MongoDbConnection } from '../db/mongo';

class UsersMongoDbRepository implements Repository<User> {
  private static _instance: UsersMongoDbRepository;

  private _users: Collection<User>;

  private constructor() {
    const collection = MongoDbConnection.getCollection('users');
    this._users = collection;
  }

  static getInstance = () => {
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
