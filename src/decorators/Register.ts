import { Inject } from "@nestjs/common";
import { REGISTER_COMMAND } from "../constants";

export const Register = () => (target: object, key: string | symbol, index?: number) => {
    return Inject(REGISTER_COMMAND)(target, key, index);
};
