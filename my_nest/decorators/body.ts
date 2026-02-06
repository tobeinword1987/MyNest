export const Body = (param?: string) => {
    return function (target: any, name: string, idx: number) {
        const params = Reflect.getMetadata('mini:params', target.constructor) ?? [];
        params.push({ index: idx, type: 'body', param, name });
        Reflect.defineMetadata('mini:params', params, target.constructor);
    };
}
