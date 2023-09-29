import { Command } from "./Command";

export abstract class CommandUseCase<C extends Command> {
  constructor(private _name: string) {}

  getName(): string {
    return this._name;
  }

  abstract execute(command: C): Promise<void>;
}
