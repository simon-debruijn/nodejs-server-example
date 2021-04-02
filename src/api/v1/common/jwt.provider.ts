import { User } from '../users/user';
import jwt, { Secret } from 'jsonwebtoken';

class JwtProvider {
  static generateAuthToken = ({ _id }: User) => {
    try {
      const token = jwt.sign({ _id }, process.env.JWT_SECRET as Secret, {
        expiresIn: '1 day',
      });
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export { JwtProvider };
