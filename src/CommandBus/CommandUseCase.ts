import { Command } from "./Command";

export abstract class CommandUseCase<C extends Command> {
  abstract execute(command: C): Promise<void>;
}
