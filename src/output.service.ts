import {Injectable} from "@nestjs/common";
import {types} from "./commander.types";

@Injectable()
export class OutputService implements types.CommandOutput {

    write(output: string) {
        // tslint:disable-next-line
        console.log(output);
    }

}
