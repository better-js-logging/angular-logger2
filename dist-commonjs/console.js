"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requireConsole() {
    var noop = function () { return null; };
    return (typeof (console) !== 'undefined') ? console :
        { log: noop, info: noop, debug: noop, warn: noop, error: noop };
}
exports.default = requireConsole;
//# sourceMappingURL=console.js.map