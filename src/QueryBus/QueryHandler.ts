import { Query } from "./Query";
import { Response } from "../Response";
import { QueryUseCase } from "./QueryUseCase";

export abstract class QueryHandler<
  Q extends Query,
  T extends QueryUseCase<Q, Response>
> {
  constructor(readonly useCase: T) {}

  async handle(query: Q): Promise<Response> {
    return this.useCase.execute(query);
  }
}
