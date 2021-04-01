import { Request, Response, NextFunction } from 'express';
import { Repository } from '../common/repository.interface';
import { User } from '../users/user';
import jwt, { Secret } from 'jsonwebtoken';

const handleAuthorization = (repository: Repository<User>) => async (
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
      process.env.JWT_SECRET as Secret
    ) as User;

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
    console.log(error);
    res.status(401).send({ error: 'Please authenticate' });
  }
};

export { handleAuthorization };
