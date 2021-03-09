import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

interface RequestMapper<T> {
  [key: string]: (
    usersList: T[]
  ) => (httpRequest: HttpRequest) => Promise<HttpResponse>;
}

export { RequestMapper };
