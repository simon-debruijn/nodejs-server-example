import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

interface HttpRequest {
  readonly path: string;
  readonly method: string;
  readonly pathParams: ParamsDictionary;
  readonly queryParams: ParsedQs;
  readonly body: Record<string, any>;
}

export { HttpRequest };
