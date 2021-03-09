interface HttpResponse {
  headers: Record<string, string>;
  statusCode: number;
  data?: unknown;
}

export { HttpResponse };
