export class CommandNotRegisteredError extends Error {
  constructor(command: string) {
    super(`The command <${command}> hasn't a command handler associated`);
  }
}
