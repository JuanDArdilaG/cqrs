import { Response } from "../Response";
import { Query } from "./Query";
import { QueryBus } from "./QueryBus";
import { QueryHandler } from "./QueryHandler";
import { QueryHandlersInformation } from "./QueryHandlersInformation";
import { QueryUseCase } from "./QueryUseCase";

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlersInformation) {}

  register(handler: QueryHandler<Query, QueryUseCase<Query, Response>>): void {
    this.queryHandlersInformation.register(handler);
  }

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query.getName());

    return handler.handle(query) as Promise<R>;
  }
}
