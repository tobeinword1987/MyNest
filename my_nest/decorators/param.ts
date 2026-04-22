export const Param = (param?: string) => {
    return function (target: any, name: string, idx: number) {
        const params = Reflect.getMetadata('mini:params', target.constructor) ?? [];
        params.push({ index: idx, type: 'param', param, name });
        Reflect.defineMetadata('mini:params', params, target.constructor);
    };
}
