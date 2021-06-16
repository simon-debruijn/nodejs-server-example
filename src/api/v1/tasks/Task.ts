import {
  validateSync,
  IsString,
  IsDefined,
  ValidationError,
  IsBoolean,
} from 'class-validator';

class Task {
  _id: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsBoolean()
  completed: boolean;

  constructor(description: string, completed?: boolean) {
    this._id = Math.random().toString();
    this.description = description;
    this.completed = completed ?? false;
  }

  static validate = (task: Task): ValidationError[] => {
    return validateSync(task);
  };
}

const isTask = (value: any): value is Task => {
  return (
    typeof value === 'object' &&
    value._id &&
    value.description &&
    ![undefined, null].includes(value.completed)
  );
};

export { Task, isTask };
