export default function requireConsole() {
    var noop = function () { return null; };
    return (typeof (console) !== 'undefined') ? console :
        { log: noop, info: noop, debug: noop, warn: noop, error: noop };
}
//# sourceMappingURL=console.js.map