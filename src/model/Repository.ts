import { RequestMapper } from '../interfaces/RequestMapper';

abstract class Repository<T> {
  protected list: T[];
  protected requestMapper: RequestMapper<T>;

  constructor(list: T[]) {
    this.list = list;
  }
}

export { Repository };
