export const Module = (metaData: { controllers?: any[]; providers?: any[] }) => {
    return function (target: any) {
        Reflect.defineMetadata('myNest-module', target, target);
        Reflect.defineMetadata('myNest-controllers', metaData.controllers, target);
        Reflect.defineMetadata('myNest-providers', metaData.providers, target);
        const module = Reflect.getMetadata('myNest-module', target);
        const controllers = Reflect.getMetadata('myNest-controllers', target);
        const providers = Reflect.getMetadata('myNest-providers', target);
        console.log(module);
        console.log(controllers);
        console.log(providers);
    }
}
