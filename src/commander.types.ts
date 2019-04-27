export namespace types {
    export type OptionsDefinitionItem<TValue> = {
        flags?: string,
        description?: string,
        defaultValue?: TValue,
    };

    export type OptionsDefinition<TOptions = {}> = {
        [P in keyof TOptions]: OptionsDefinitionItem<TOptions[P]>
    };

    export type PropertyNames<T> = { [K in keyof T]: T[K] extends any ? K : never }[keyof T] & string;

    export type CommandInput<TOptions extends {}> = {
        get: <P extends PropertyNames<TOptions>>(key: P) => TOptions[P],
        has: <P extends PropertyNames<TOptions>>(key: P) => boolean,
    };

    export type CommandOutput = {
        write: (...args: any[]) => void,
    };

    export type Command<TOptions extends {}> = {

        signature: string;
        options: OptionsDefinitionItem<TOptions>;

        input: CommandInput<TOptions>;

        fire(): any;
    };
}
