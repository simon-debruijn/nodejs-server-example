import { Repository } from '../common/repository.interface';
import { User } from './user.interface';

class UsersMongoDBRepository implements Repository<User> {
  addOne(newInstance: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  addMany(newInstances: User[]): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  find(properties?: Partial<User>): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
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

export { UsersMongoDBRepository };