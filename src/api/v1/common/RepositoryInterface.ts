import type { ValidationErrorResponse } from './ValidationErrorResponseInterface';

interface Repository<T> {
  addOne(newInstance: unknown): Promise<T | ValidationErrorResponse>;
  addMany(newInstances: unknown[]): Promise<T[] | ValidationErrorResponse>;
  findOneById(id: string): Promise<T | undefined>;
  find(properties?: Partial<T>): Promise<T[]>;
  deleteOneById(id: string): Promise<T | undefined>;
  deleteManyByIds(ids: string[]): Promise<string>;
  updateOneById(id: string, properties: Partial<T>): Promise<T | undefined>;
  updateManyByIds(ids: string[], properties: Partial<T>): Promise<string>;
}

export type { Repository };
