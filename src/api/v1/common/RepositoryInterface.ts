import { ValidationErrorResponse } from './ValidationErrorResponseInterface';

interface Repository<T> {
  addOne(newInstance: any): Promise<T | ValidationErrorResponse>;
  addMany(newInstances: any[]): Promise<T[] | ValidationErrorResponse>;
  findOneById(id: string): Promise<T | undefined>;
  find(properties?: Partial<T>): Promise<T[]>;
  deleteOneById(id: string): Promise<T | undefined>;
  deleteManyByIds(ids: string[]): Promise<string>;
  updateOneById(id: string, properties: Partial<T>): Promise<T | undefined>;
  updateManyByIds(ids: string[], properties: Partial<T>): Promise<string>;
}

export type { Repository };
