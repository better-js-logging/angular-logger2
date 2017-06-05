export default function requireConsole() {
    var noop = function () { return null; };
    return (typeof (console) !== 'undefined') ? console :
        { trace: noop, debug: noop, info: noop, warn: noop, error: noop };
}
//# sourceMappingURL=console.js.map