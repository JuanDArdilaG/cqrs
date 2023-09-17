export abstract class Command {
  abstract fromBodyRequest(req: Body): Command;
}
