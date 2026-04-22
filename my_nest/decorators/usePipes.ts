import { ArgumentMetadata } from "../../types/types";

export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R | Promise<R>;
}

export function UsePipes(pipeClass?: PipeTransform) {
    return function (target: any, property?: string, descriptor?: any) {
        if (typeof target === 'object') {
        Reflect.defineMetadata('PIPE_METADATA', pipeClass, descriptor.value)
        } else
        {
            Reflect.defineMetadata('PIPE_METADATA_CONTROLLER', pipeClass, target)
        }
    }
}
