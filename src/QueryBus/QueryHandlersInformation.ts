import { Response } from "../Response";
import { Query } from "./Query";
import { QueryHandler } from "./QueryHandler";
import { QueryNotRegisteredError } from "./QueryNotRegisteredError";
import { QueryUseCase } from "./QueryUseCase";

export class QueryHandlersInformation {
  readonly queryHandlersMap: Map<
    string,
    QueryHandler<QueryUseCase<Query, Response>>
  >;

  constructor(
    queryHandlers: Array<QueryHandler<QueryUseCase<Query, Response>>>
  ) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers);
  }

  register(
    query: Query,
    handler: QueryHandler<QueryUseCase<Query, Response>>
  ): void {
    this.queryHandlersMap.set(query.name, handler);
  }

  private formatHandlers(
    queryHandlers: Array<QueryHandler<QueryUseCase<Query, Response>>>
  ): Map<string, QueryHandler<QueryUseCase<Query, Response>>> {
    const handlersMap = new Map();

    queryHandlers.forEach((queryHandler) => {
      handlersMap.set(queryHandler.subscribedTo().name, queryHandler);
    });

    return handlersMap;
  }

  public search(query: Query): QueryHandler<QueryUseCase<Query, Response>> {
    const queryHandler = this.queryHandlersMap.get(query.name);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
