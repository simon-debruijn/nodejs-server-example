import { HttpRequest } from '../../interfaces/HttpRequest';
import { HttpResponse } from '../../interfaces/HttpResponse';
import { User } from '../../interfaces/User';

const getUsers = (usersList: User[]) => async (
  httpRequest: HttpRequest
): Promise<HttpResponse> => {
  if (httpRequest.pathParams.id) {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      data: JSON.stringify({
        name: `Specific user ${httpRequest.pathParams.id}`,
      }),
    };
  }

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    data: JSON.stringify(usersList),
  };
};

const addUsers = (usersList: User[]) => async (
  httpRequest: HttpRequest
): Promise<HttpResponse> => {
  const { body: user } = httpRequest;
  usersList.push(user as User);

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    data: JSON.stringify(user),
  };
};

export { getUsers, addUsers };
