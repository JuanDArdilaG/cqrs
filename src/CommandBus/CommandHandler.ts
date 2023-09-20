import { Command } from "./Command";
import { CommandUseCase } from "./CommandUseCase";

export abstract class CommandHandler<T extends CommandUseCase<Command>> {
  constructor(private _useCase: T) {}

  abstract subscribedTo(): Command;

  handle(command: Command): Promise<void> {
    return this._useCase.execute(command);
  }
}
