interface RepositoryInterface<T> {
  addOne(newInstance: T): Promise<T>;
  addMany(newInstances: T[]): Promise<T[]>;
  findOneById(id: string): Promise<T>;
  find(properties?: Partial<T>): Promise<T[]>;
  deleteOneById(id: string): Promise<T>;
  deleteManyByIds(ids: string[]): Promise<T[]>;
  updateOneById(id: string, properties: Partial<T>): Promise<T>;
  updateManyByIds(ids: string[], properties: Partial<T>): Promise<T[]>;
}

export { RepositoryInterface };
