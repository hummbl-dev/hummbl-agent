const ESCAPE_RE = /[\\|{};=]/g;
export function escapeTupleComponent(input) {
    return input.replace(ESCAPE_RE, (match) => `\\${match}`);
}
//# sourceMappingURL=escape.js.map