const ESCAPE_RE = /[\\|{};=]/g;

export function escapeTupleComponent(input: string): string {
  return input.replace(ESCAPE_RE, (match) => `\\${match}`);
}
