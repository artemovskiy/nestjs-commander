import {createCommanderModule, ExecutorService} from "../src";
import {Test} from "@nestjs/testing";
import {createCommand} from "./utils/createCommand";
import {CommanderModule} from "../src/commander.module";
import {AppModule} from "./utils/app.module";

const cmdCallback = jest.fn();
const cmd = createCommand(cmdCallback);

describe("nestjs-commander module", () => {

    let executor: ExecutorService = null;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                createCommanderModule(AppModule, [cmd]),
            ],
            exports: [
                CommanderModule,
            ],
        }).compile();
        executor = module.get(ExecutorService);
    });

    test("should execute command", async () => {
        executor.handle(["node", "src/cli.ts", "test"]);
        expect(cmdCallback).toBeCalled();
    });

});
