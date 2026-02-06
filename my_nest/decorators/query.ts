export const Query = (param?: string) => {
    return function (target: any, name: string, idx: number) {
        const params = Reflect.getMetadata('mini:params', target.constructor) ?? [];
        params.push({ index: idx, type: 'query', param, name });
        Reflect.defineMetadata('mini:params', params, target.constructor);
    };
}
