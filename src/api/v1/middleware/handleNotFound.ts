import type { NextFunction, Request, Response } from 'express';

export const handleNotFound = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(404).send({ error: 'Resource not found' });
};
