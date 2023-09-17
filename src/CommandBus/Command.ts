export abstract class Command {
  abstract fromRequest(req: Request): Command;
}
