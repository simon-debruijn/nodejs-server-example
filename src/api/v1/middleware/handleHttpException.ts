import type { NextFunction, Request, Response } from 'express';

import type { HttpException } from '../common/HttpException';

export const handleHttpException = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(500).send({ error: 'Internal server error' });
};
