import { HttpException } from '../common/http-exception';
import { Request, Response, NextFunction } from 'express';

export const handleHttpException = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(500).send({ error: 'Internal server error' });
};
