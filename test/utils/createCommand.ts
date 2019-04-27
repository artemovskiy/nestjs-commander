import {AbstractCommand} from "../../src";
import {Type} from "@nestjs/common";

export const createCommand = (callback: (...args: any[]) => any): Type<AbstractCommand<{}>> => class TestCommand extends AbstractCommand<{}> {

    readonly signature: string = "test";

    readonly options = {};

    fire() {
        callback(this.input);
    }

};
