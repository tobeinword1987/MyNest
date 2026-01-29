export const Controller = (prefix: any) => {
    return function (target: any) {
        Reflect.defineMetadata('myNest-baseRoute', prefix, target);
    }
}
