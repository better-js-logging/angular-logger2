export default function requireConsole(): { trace, info, debug, warn, error } {
    const noop: () => void = () => null;
    return (typeof(console) !== 'undefined') ? console :
        {trace: noop, debug: noop, info: noop, warn: noop, error: noop};
}