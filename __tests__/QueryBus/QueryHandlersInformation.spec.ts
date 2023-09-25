import { Query } from "../../src/QueryBus/Query";
import { QueryHandler } from "../../src/QueryBus/QueryHandler";
import { QueryUseCase } from "../../src/QueryBus/QueryUseCase";
import { Response } from "../../src/Response";
import { QueryHandlersInformation } from "../../src/QueryBus/QueryHandlersInformation";

class TQuery extends Query {
  name: string;
  constructor(name: string) {
    super();
    this.name = "TQuery-" + name;
  }

  getName(): string {
    return this.name;
  }
}

class TQueryUseCase<_> extends QueryUseCase<TQuery, Response> {
  execute(_: TQuery): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

class TQueryHandler<T> extends QueryHandler<
  Query,
  QueryUseCase<Query, Response>
> {
  constructor(example: TQuery) {
    super(new TQueryUseCase<T>(example));
  }

  handle(_: Query): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

describe("QueryHandlersInformation", () => {
  it("should be able to register a generic query handler", () => {
    const stringQueryHandler = new TQueryHandler<string>(new TQuery("string"));
    const numberQueryHandler = new TQueryHandler<number>(new TQuery("number"));

    const queryHandlersInformation = new QueryHandlersInformation([
      stringQueryHandler,
      numberQueryHandler,
    ]);

    console.log(queryHandlersInformation.queryHandlers);

    expect(queryHandlersInformation).toBeDefined();
    expect(queryHandlersInformation.queryHandlers).toHaveLength(2);
  });
});
