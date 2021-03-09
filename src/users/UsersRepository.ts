import { InvalidRequestError } from '../errors/InvalidRequestError';
import { HttpRequest } from '../types/HttpRequest';
import { HttpResponse } from '../types/HttpResponse';
import { Repository } from '../types/Repository';
import { RequestHandler } from '../types/RequestHandler';
import { RequestMapper } from '../types/RequestMapper';
import { User } from '../types/User';

const getUsers = (usersList: User[]) => async (
  httpRequest: HttpRequest
): Promise<HttpResponse> => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    data: JSON.stringify(usersList),
  };
};

class UsersRepository implements RequestHandler, Repository<User> {
  list: User[];

  requestMapper: RequestMapper<User> = {
    GET: getUsers,
  };

  constructor(list: User[]) {
    this.list = list;
  }

  handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpMethod = httpRequest.method.toUpperCase();
    const requestHandler = this.requestMapper[httpMethod];

    if (!requestHandler) {
      throw new InvalidRequestError(httpRequest.method);
    }

    return requestHandler(this.list)(httpRequest);
  }
}

export { UsersRepository };
