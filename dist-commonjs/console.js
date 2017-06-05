"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requireConsole() {
    var noop = function () { return null; };
    return (typeof (console) !== 'undefined') ? console :
        { trace: noop, debug: noop, info: noop, warn: noop, error: noop };
}
exports.default = requireConsole;
//# sourceMappingURL=console.js.map