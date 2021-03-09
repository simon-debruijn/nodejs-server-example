import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

interface RequestHandler {
  handleRequest(httpRequest: HttpRequest): Promise<HttpResponse>;
}

export { RequestHandler };
