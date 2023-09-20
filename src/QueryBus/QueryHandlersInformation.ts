import { Response } from "../Response";
import { Query } from "./Query";
import { QueryHandler } from "./QueryHandler";
import { QueryNotRegisteredError } from "./QueryNotRegisteredError";
import { QueryUseCase } from "./QueryUseCase";

export class QueryHandlersInformation {
  private queryHandlersMap: Map<
    Query,
    QueryHandler<QueryUseCase<Query, Response>>
  >;

  constructor(
    queryHandlers: Array<QueryHandler<QueryUseCase<Query, Response>>>
  ) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers);
  }

  private formatHandlers(
    queryHandlers: Array<QueryHandler<QueryUseCase<Query, Response>>>
  ): Map<Query, QueryHandler<QueryUseCase<Query, Response>>> {
    const handlersMap = new Map();

    queryHandlers.forEach((queryHandler) => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });

    return handlersMap;
  }

  public search(query: Query): QueryHandler<QueryUseCase<Query, Response>> {
    const queryHandler = this.queryHandlersMap.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
