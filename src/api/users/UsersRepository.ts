import { InvalidRequestError } from '../../errors/InvalidRequestError';
import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { RequestHandler } from '../../interfaces/RequestHandler';
import { User } from '../../interfaces/User';
import { Repository } from '../../model/Repository';
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
