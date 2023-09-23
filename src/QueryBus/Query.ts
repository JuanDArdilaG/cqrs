export abstract class Query {
  name(): string {
    return this.constructor.name;
  }
}
