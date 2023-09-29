import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";
import { CommandNotRegisteredError } from "./CommandNotRegisteredError";
import { CommandUseCase } from "./CommandUseCase";

export class CommandHandlersInformation {
  private commandHandlers: Array<CommandHandler<CommandUseCase<Command>>>;

  constructor(commandHandlers: Array<CommandHandler<CommandUseCase<Command>>>) {
    this.commandHandlers = commandHandlers;
  }

  public search(command: string): CommandHandler<CommandUseCase<Command>> {
    const commandHandler = this.commandHandlers.find((commandHandler) => {
      return commandHandler.useCase.getName() === command;
    });

    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }

    return commandHandler;
  }
}
