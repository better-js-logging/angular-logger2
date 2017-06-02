import {Injectable} from "@angular/core";

@Injectable()
export class LoggingConfig {
    constructor(public prefixPattern?: string,
                public datetimePattern?: string,
                public datetimeLocale?: string,
                public contextLogLevels?: Array<ContextLogLevel>) {
    }
}

export class LogLevel {
    public static TRACE = new LogLevel('TRACE', 4);
    public static DEBUG = new LogLevel('DEBUG', 3);
    public static INFO = new LogLevel('INFO', 2);
    public static WARN = new LogLevel('WARN', 1);
    public static ERROR = new LogLevel('ERROR', 0);
    public static OFF = new LogLevel('OFF', -1);
    
    constructor(public readonly name: string, public readonly level: number) {
    }
}

export class ContextLogLevel {
    constructor(public readonly context: string,
                public readonly logLevel: LogLevel) {
    }
}