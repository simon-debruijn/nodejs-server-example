import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { Request } from '../entities/Request';
import { UsersRepository } from './UsersRepository';

const handleUsersRequests = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    const httpRequest = new Request(req);
    const usersRepository = new UsersRepository([
      { name: 'John', email: 'john@msn.be', password: 'password' },
    ]);

    const { headers, statusCode, data } = await usersRepository.handleRequest(
      httpRequest
    );

    res.set(headers).status(statusCode).send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send();
  }
};

export { handleUsersRequests };
