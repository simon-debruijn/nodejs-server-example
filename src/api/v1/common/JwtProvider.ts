import { User } from '../users/User';
import jwt from 'jsonwebtoken';

class JwtProvider {
  static generateAuthToken({ _id }: User) {
    return jwt.sign({ _id }, process.env.JWT_SECRET ?? '', {
      expiresIn: '1 day',
    });
  }
}

export { JwtProvider };
