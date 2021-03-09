import { RequestMapper } from './RequestMapper';

interface Repository<T> {
  list: T[];
  requestMapper: RequestMapper<T>;
}

export { Repository };
