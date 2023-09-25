import { Response } from "../Response";
import { Query } from "./Query";

export abstract class QueryUseCase<Q extends Query, R extends Response> {
  constructor(private _example: Q) {}
  getName(): string {
    return this._example.getName();
  }
  abstract execute(query: Q): Promise<R>;
}
