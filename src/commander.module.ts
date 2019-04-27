import {DynamicModule, Module, Type} from "@nestjs/common";
import {ExecutorService} from "./executor.service";
import {OutputService} from "./output.service";
import {AbstractCommand} from "./AbstractCommand";
import {REGISTER_COMMAND} from "./constants";

@Module({})
export class CommanderModule {

}

export const createCommanderModule = (rootModule: any, commands: Array<Type<AbstractCommand<any>>>): DynamicModule => {
    return {
        module: CommanderModule,
        imports: [rootModule],
        providers: [
            {
                provide: ExecutorService,
                useFactory: (outputService: OutputService, ...commandInjections: Array<AbstractCommand<any>>) => {
                    const executor = new ExecutorService(outputService);
                    for (const command of commandInjections) {
                        executor.registerCommand(command);
                    }
                    return executor;
                },
                inject: [OutputService, ...commands],
            },
            {
                provide: REGISTER_COMMAND,
                useFactory: (executor: ExecutorService) => (command: AbstractCommand<any>) => {
                    executor.registerCommand(command);
                },
                inject: [ExecutorService],
            },
            ...commands,
            OutputService,
        ],
    };
};
