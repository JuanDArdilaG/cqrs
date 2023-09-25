export class QueryNotRegisteredError extends Error {
  constructor(query: string) {
    super(`The query <${query}> hasn't a query handler associated`);
  }
}
