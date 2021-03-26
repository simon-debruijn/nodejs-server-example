import { Request, Response, NextFunction } from 'express';

export const handleNotFound = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = 'Resource not found';

  response.status(404).send(message);
};
