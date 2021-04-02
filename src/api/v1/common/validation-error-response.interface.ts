import { ValidationError } from 'class-validator';

interface ValidationErrorResponse {
  error: ValidationError[];
}

export { ValidationErrorResponse };
