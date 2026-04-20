import express from 'express';
import { addRoute, routes } from './routes.ts'
import { registrationSvc } from './registration.service.ts'

export const Factory = (modules: Array<any>) => {
    const app = express();
    app.use(express.json());

    const listen = (port: number, callback?: () => void) => {
        const providersExported = new Map();
        const modulesImported = [];
        const moduleProviders = new Map();
        const customProvidersMap = new Map();

        modules.forEach(module => {
            if (Reflect.getMetadata('myNest-module', module)) {
                const exported = Reflect.getMetadata('myNest-exports', module)
                if (exported) {
                    exported.forEach(exportedOne => {
                        providersExported.set(exportedOne.useClass ? exportedOne.useClass : exportedOne, module)
                    })
                }
                const moduleProvidersArr = Reflect.getMetadata('myNest-providers', module)
                if (moduleProvidersArr) {
                    moduleProvidersArr.forEach(exportedOne => {
                        moduleProviders.set(exportedOne.useClass ? exportedOne.useClass : exportedOne, module);
                        customProvidersMap.set(exportedOne.provide, exportedOne.useClass);
                    })
                }
                const moduleImportedsArr = Reflect.getMetadata('myNest-imports', module)
                if (moduleImportedsArr) {
                    moduleImportedsArr.forEach(importedOne => {
                        modulesImported.push(importedOne);
                    })
                }
            }
        })

        modules.forEach(module => {
            if (Reflect.getMetadata('myNest-module', module)) {
                const controllers = Reflect.getMetadata('myNest-controllers', module);
                for (let j = 0; j < controllers.length; j++) {
                    let singletonProvider: any;
                    const tokens = Reflect.getMetadata('myNest-injectedByToken', controllers[j]) || new Map();
                    const singletonProviders = [];
                    const providers = Reflect.getMetadata('design:paramtypes', controllers[j]);

                    for (let k = 0; k < providers.length; k++) {
                        //1) provider is exported in module which is imported
                        //2) provider in providers and module is current
                        const moduleImported = providersExported.get(providers[k]);
                        if (moduleProviders.get(providers[k]) !== module && !(moduleImported && modulesImported.includes(moduleImported))) {
                            throw new Error(`Module: ${module}, ${providers[k]} was not exported in modules`)
                        }

                        if (tokens.has(k)) {
                            singletonProvider = registrationSvc.getInstance(customProvidersMap.get(tokens.get(k)));
                            singletonProviders.push(singletonProvider);
                        } else if (customProvidersMap.get(providers[k])) {
                            singletonProvider = registrationSvc.getInstance(customProvidersMap.get(providers[k]));
                            singletonProviders.push(singletonProvider);
                        } else {
                            singletonProvider = registrationSvc.getInstance(providers[k]);
                            singletonProviders.push(singletonProvider);
                        }
                    }

                    const contr = new controllers[j](...singletonProviders)
                    const baseRoute = Reflect.getMetadata('myNest-baseRoute', controllers[j]) || '';
                    const routes = Reflect.getMetadata('myNest-routes', controllers[j]);
                    routes.forEach(route => {
                        const fullRoute = baseRoute + route.route;
                        addRoute(route.method, fullRoute, route.func.bind(contr), route.func, controllers[j]);
                    });
                }
            }
        })

        app.use(routes);

        app.listen(port, callback)
    }

    return {
        listen
    };
}
