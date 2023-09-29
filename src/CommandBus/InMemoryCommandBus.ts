import { Command } from "./Command";
import { CommandBus } from "./CommandBus";
import { CommandHandlersInformation } from "./CommandHandlersInformation";

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlersInformation: CommandHandlersInformation) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlersInformation.search(command.getName());

    await handler.handle(command);
  }
}
