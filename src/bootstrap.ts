import {NestFactory} from "@nestjs/core"
import {AbstractCommand} from "./AbstractCommand"
import {createCommanderModule} from "./commander.module"
import {Type} from "@nestjs/common"
import {ExecutorService} from "./executor.service"

export const bootstrap = async (commands: Type<AbstractCommand<any>>[], appModule: any) => {
    const app = await NestFactory.create(createCommanderModule(appModule, commands));
    const executor = app.get(ExecutorService);
    executor.handle(process.argv);
}
