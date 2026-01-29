export const Get = (prefix: string) => {
    return function (target: any, property: string, descriptor: any) {
        const routes = Reflect.getMetadata('myNest-routes', target.constructor) || [];
        routes.push({
            route: prefix,
            func: descriptor.value,
            method: 'get'
        })
        Reflect.defineMetadata('myNest-routes', routes, target.constructor);
    }
}
