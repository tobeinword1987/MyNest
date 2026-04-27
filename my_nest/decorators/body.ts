import type { PipeTransform } from "./usePipes";

export const Body = (...args: any[]) => {
    let param: string | undefined;
    let pipe: PipeTransform | undefined;
    return function (target: any, name: string, idx: number) {
        if ((args.length === 1) && (typeof args[0] === 'object')) {
            param = undefined;
            pipe = args[0];
        }
        if ((args.length === 1) && (typeof args[0] === 'string')) {
            param = args[0];
            pipe = undefined;
        }
        if ((args.length === 2) && (typeof args[0] === 'string') && (typeof args[1] === 'object')) {
            param = args[0];
            pipe = args[1];
        }

        const params = Reflect.getMetadata('mini:params', target.constructor) ?? [];
        params.push({ index: idx, type: 'body', param, pipe, name });
        Reflect.defineMetadata('mini:params', params, target.constructor);
    };
}
