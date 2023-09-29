import { Command } from "./Command";
import { CommandUseCase } from "./CommandUseCase";

export abstract class CommandHandler<T extends CommandUseCase<Command>> {
  constructor(readonly useCase: T) {}

  handle(command: Command): Promise<void> {
    return this.useCase.execute(command);
  }
}
