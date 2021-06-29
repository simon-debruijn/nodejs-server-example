import jwt from 'jsonwebtoken';

import type { User } from '../users/User';

class JwtProvider {
  static generateAuthToken({ _id }: User) {
    return jwt.sign({ _id }, process.env.JWT_SECRET ?? '', {
      expiresIn: '1 day',
    });
  }
}

export { JwtProvider };
