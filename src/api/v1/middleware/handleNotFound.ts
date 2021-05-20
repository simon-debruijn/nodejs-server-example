import { Request, Response, NextFunction } from 'express';

export const handleNotFound = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(404).send({ error: 'Resource not found' });
};
