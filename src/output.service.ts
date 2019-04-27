import { Injectable } from "@nestjs/common";
import { types } from "./commander.types";

@Injectable()
export class OutputService implements types.CommandOutput {

    write(output: string) {
        console.log(output);
    }

}
