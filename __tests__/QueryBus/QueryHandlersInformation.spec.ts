import { Query } from "../../src/QueryBus/Query";
import { QueryHandler } from "../../src/QueryBus/QueryHandler";
import { QueryUseCase } from "../../src/QueryBus/QueryUseCase";
import { Response } from "../../src/Response";
import { QueryHandlersInformation } from "../../src/QueryBus/QueryHandlersInformation";

class TQuery<T> extends Query {
  name: string;
  constructor(readonly example: T) {
    super();
    this.name = "TQuery" + "-" + typeof this.example;
  }
}

class TQueryUseCase<T> extends QueryUseCase<TQuery<T>, Response> {
  execute(_: TQuery<T>): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

class TQueryHandler<T> extends QueryHandler<QueryUseCase<Query, Response>> {
  constructor(private readonly example: T) {
    super(new TQueryUseCase<T>());
  }
  subscribedTo(): Query {
    return new TQuery<T>(this.example);
  }
  handle(_: Query): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

describe("QueryHandlersInformation", () => {
  it("should be able to register a generic query handler", () => {
    const stringQueryHandler = new TQueryHandler<string>("");
    const numberQueryHandler = new TQueryHandler<number>(0);

    const queryHandlersInformation = new QueryHandlersInformation([
      stringQueryHandler,
      numberQueryHandler,
    ]);

    console.log(queryHandlersInformation.queryHandlersMap);

    expect(queryHandlersInformation).toBeDefined();
    expect(queryHandlersInformation.queryHandlersMap.size).toBe(2);
  });
});
