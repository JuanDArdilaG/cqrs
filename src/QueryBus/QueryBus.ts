import { Response } from "../Response";
import { Query } from "./Query";
import { QueryHandler } from "./QueryHandler";
import { QueryUseCase } from "./QueryUseCase";

export interface QueryBus {
  register(
    query: Query,
    handler: QueryHandler<QueryUseCase<Query, Response>>
  ): void;
  ask<R extends Response>(query?: Query): Promise<R>;
}
