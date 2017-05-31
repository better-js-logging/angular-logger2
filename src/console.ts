export default function requireConsole(): { log, info, debug, warn, error } {
    const noop: () => void = () => null;
    return (typeof(console) !== 'undefined') ? console :
        {log: noop, info: noop, debug: noop, warn: noop, error: noop};
}