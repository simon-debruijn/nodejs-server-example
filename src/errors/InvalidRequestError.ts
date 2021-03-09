class InvalidRequestError extends Error {
  constructor(method: string) {
    super(`Invalid request ${method}`);
    this.name = 'InvalidRequestError';
  }
}

export { InvalidRequestError };
