import { Response } from "../Response";
import { Query } from "./Query";

export abstract class QueryUseCase<Q extends Query, R extends Response> {
  abstract execute(query: Q): Promise<R>;
}
