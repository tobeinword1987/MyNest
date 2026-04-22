export const Module = (metaData: { controllers?: any[]; providers?: any[]; imports?: any[], exports?: any[] }) => {
    return function (target: any) {
        if (metaData.exports) Reflect.defineMetadata('myNest-exports', metaData.exports, target)
        if (metaData.imports) Reflect.defineMetadata('myNest-imports', metaData.imports, target)
        Reflect.defineMetadata('myNest-module', target, target);
        Reflect.defineMetadata('myNest-controllers', metaData.controllers, target);
        Reflect.defineMetadata('myNest-providers', metaData.providers, target);
    }
}
