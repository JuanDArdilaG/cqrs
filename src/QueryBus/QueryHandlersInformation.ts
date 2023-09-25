import { Response } from "../Response";
import { Query } from "./Query";
import { QueryHandler } from "./QueryHandler";
import { QueryNotRegisteredError } from "./QueryNotRegisteredError";
import { QueryUseCase } from "./QueryUseCase";

export class QueryHandlersInformation {
  readonly queryHandlers: Array<
    QueryHandler<Query, QueryUseCase<Query, Response>>
  >;

  constructor(
    queryHandlers: Array<QueryHandler<Query, QueryUseCase<Query, Response>>>
  ) {
    this.queryHandlers = queryHandlers;
  }

  register(handler: QueryHandler<Query, QueryUseCase<Query, Response>>): void {
    try {
      const qh = this.search(handler.useCase.getName());
      throw new Error(
        `Query ${handler.useCase.getName()} already registered in ${qh.useCase.getName()}`
      );
    } catch (error) {
      if (error instanceof QueryNotRegisteredError) {
        this.queryHandlers.push(handler);
      } else {
        throw error;
      }
    }
  }

  public search(
    query: string
  ): QueryHandler<Query, QueryUseCase<Query, Response>> {
    const queryHandler = this.queryHandlers.find((queryHandler) => {
      return queryHandler.useCase.getName() === query;
    });

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
