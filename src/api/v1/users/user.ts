import type { ValidationError } from 'class-validator';
import {
  IsDefined,
  IsEmail,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

class User {
  _id: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  password: string;

  tokens: string[] = [];

  constructor({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    this._id = Math.random().toString();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static validate = (user: User): ValidationError[] => {
    return validateSync(user);
  };
}

const isUser = (value: any): value is User => {
  return (
    typeof value === 'object' &&
    value._id &&
    value.name &&
    value.email &&
    value.password
  );
};

export { isUser, User };
