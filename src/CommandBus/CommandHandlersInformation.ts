import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";
import { CommandNotRegisteredError } from "./CommandNotRegisteredError";
import { CommandUseCase } from "./CommandUseCase";

export class CommandHandlersInformation {
  private commandHandlersMap: Map<
    Function,
    CommandHandler<CommandUseCase<Command>>
  >;

  constructor(commandHandlers: Array<CommandHandler<CommandUseCase<Command>>>) {
    this.commandHandlersMap = this.formatHandlers(commandHandlers);
  }

  private formatHandlers(
    commandHandlers: Array<CommandHandler<CommandUseCase<Command>>>
  ): Map<Function, CommandHandler<CommandUseCase<Command>>> {
    const handlersMap = new Map();

    commandHandlers.forEach((commandHandler) => {
      handlersMap.set(commandHandler.subscribedTo(), commandHandler);
    });

    return handlersMap;
  }

  public search(command: Command): CommandHandler<CommandUseCase<Command>> {
    const commandHandler = this.commandHandlersMap.get(command.constructor);

    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }

    return commandHandler;
  }
}
