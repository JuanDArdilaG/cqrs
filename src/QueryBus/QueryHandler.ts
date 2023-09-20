import { Query } from "./Query";
import { Response } from "../Response";
import { QueryUseCase } from "./QueryUseCase";

export abstract class QueryHandler<T extends QueryUseCase<Query, Response>> {
  constructor(private _useCase: T) {}

  abstract subscribedTo(): Query;

  async handle(query: Query): Promise<Response> {
    return this._useCase.execute(query);
  }
}
