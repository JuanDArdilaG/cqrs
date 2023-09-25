import { Response } from "../Response";
import { Query } from "./Query";
import { QueryHandler } from "./QueryHandler";
import { QueryUseCase } from "./QueryUseCase";

export interface QueryBus {
  register<Q extends Query>(
    handler: QueryHandler<Q, QueryUseCase<Q, Response>>
  ): void;
  ask<R extends Response>(query?: Query): Promise<R>;
}
