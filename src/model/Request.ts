import { Request as ExpressRequest } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { HttpRequest } from '../interfaces/HttpRequest';

class Request implements HttpRequest {
  private _path: string;
  private _method: string;
  private _pathParams: ParamsDictionary;
  private _queryParams: ParsedQs;
  private _body: Record<string, any>;

  constructor(request: ExpressRequest) {
    this._path = request.path;
    this._method = request.method;
    this._pathParams = request.params;
    this._queryParams = request.query;
    this._body = request.body;
  }

  get path() {
    return this._path;
  }

  get method() {
    return this._method;
  }

  get pathParams() {
    return this._pathParams;
  }

  get queryParams() {
    return this._queryParams;
  }

  get body() {
    return this._body;
  }
}

export { Request };
