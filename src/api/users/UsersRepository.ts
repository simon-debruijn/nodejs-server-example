import { InvalidRequestError } from '../../errors/InvalidRequestError';
import { HttpRequest } from '../../types/HttpRequest';
import { HttpResponse } from '../../types/HttpResponse';
import { RequestHandler } from '../../types/RequestHandler';
import { User } from '../../types/User';
import { Repository } from '../../types/Repository';
import { addUsers, getUsers } from './actions';

class UsersRepository extends Repository<User> implements RequestHandler {
  protected requestMapper = {
    GET: getUsers,
    POST: addUsers,
  };

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
