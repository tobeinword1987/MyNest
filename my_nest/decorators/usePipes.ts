import { ArgumentMetadata } from "../../types/types";

export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R | Promise<R>;
}

export function UsePipes(pipeClass?: PipeTransform) {
    return function (target: any, property?: string, descriptor?: any) {
        console.log(typeof target);
        if (typeof target === 'object') {
        console.log('%%%%%%%% target ', target);
        console.log(Object.getOwnPropertyNames(target));
        console.log('%%%%%%%% property ', property);
        console.log('%%%%%%%% descriptor ', descriptor);
        Reflect.defineMetadata('PIPE_METADATA', pipeClass, descriptor.value)
        } else
        {
            console.log('%%%%%%%% target ', target);
            Reflect.defineMetadata('PIPE_METADATA_CONTROLLER', pipeClass, target)
        }
    }
}
