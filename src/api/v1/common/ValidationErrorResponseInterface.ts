import { ValidationError } from 'class-validator';

interface ValidationErrorResponse {
  error: ValidationError[];
}

const isValidationErrorResponse = (
  value: any
): value is ValidationErrorResponse => {
  return typeof value === 'object' && !!value.error;
};

export { isValidationErrorResponse };
export type { ValidationErrorResponse };
