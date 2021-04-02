import {
  validateSync,
  IsEmail,
  IsString,
  MinLength,
  IsDefined,
  ValidationError,
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

  constructor(name: string, email: string, password: string) {
    this._id = Math.random().toString();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static validate = (user: User): ValidationError[] => {
    return validateSync(user);
  };
}

export { User };
