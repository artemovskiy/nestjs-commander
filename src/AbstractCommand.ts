import {types } from "./commander.types";
import * as commander from "commander";
import { CommandInput } from "./CommandInput";

type InitializationOptions<T> = {
    input: types.CommandInput<T>,
    output: types.CommandOutput,
};

export abstract class AbstractCommand<TOptions extends {}> implements types.Command<TOptions> {

    public abstract readonly signature: string;
    public readonly options: types.OptionsDefinition<TOptions>;

    input: types.CommandInput<TOptions>;
    output: types.CommandOutput;

    public init({ input, output }: InitializationOptions<TOptions>) {
        this.input = input;
        this.output = output;
    }

    public useInput(input: commander.Command) {
        const options: { [index: string]: any } = {};
        for (const key of Object.keys(this.options)) {
            options[key] = input[key];
        }
        this.input = new CommandInput<TOptions>(options as TOptions);
    }

    public getOptionFlags(key: string): string {
        const o = this.options[key];
        if (typeof o.flags === "undefined") {
            return `--${key}`;
        }
        return o.flags;
    }

    public abstract fire();

}
