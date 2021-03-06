import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import type { Repository } from '../common/RepositoryInterface';
import type { User } from '../users/User';
import { isUser } from '../users/User';

const createAuthorizationHandler =
  (repository: Repository<User>) =>
  async (
    req: Request & { token: string; user: User },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(
        token.toString(),
        process.env.JWT_SECRET ?? ''
      );

      if (!isUser(decoded)) {
        throw new Error();
      }

      const { _id } = decoded;
      const user = await repository.findOneById(_id);

      if (!user) {
        throw new Error();
      }

      const doesContainToken = user.tokens.includes(token);

      if (!doesContainToken) {
        throw new Error();
      }

      req.token = token;
      req.user = user;

      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate' });
    }
  };

export { createAuthorizationHandler };
