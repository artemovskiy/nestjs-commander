import { types } from "./commander.types";

export class CommandInput<T> implements types.CommandInput<T> {

    protected options: T;

    constructor(options: T) {
        this.options = options;
    }

    get<P extends types.PropertyNames<T>>(key: P): T[P] {
        return this.options[key];
    }

    has<P extends types.PropertyNames<T>>(key: P): boolean {
        return typeof this.options[key] !== "undefined";
    }

}
