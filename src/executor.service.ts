import {Inject, Injectable} from "@nestjs/common"
import * as commander from "commander";
import { CommanderStatic } from "commander";
import { AbstractCommand } from "./AbstractCommand";
import { OutputService } from "./output.service";

@Injectable()
export class ExecutorService {

    protected program: CommanderStatic;

    constructor(
        @Inject(OutputService) private readonly output: OutputService,
    ) {
        this.program = commander;
    }

    handle(command: string[]) {
        this.program.parse(command);
    }

    registerCommand(command: AbstractCommand<any>) {
        const c = this.program.command(command.signature);
        for (const key of Object.keys(command.options)) {
            const o = command.options[key];
            c.option(command.getOptionFlags(key), o.description, o.defaultValue);
        }
        c.action((cmd) => {
            command.init({ output: this.output, input: null });
            command.useInput(cmd);
            command.fire();
        });
    }

}
