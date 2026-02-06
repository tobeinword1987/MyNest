import express from 'express';
import { addRoute, routes } from './routes.ts'
import { registrationSvc } from './registration.service.ts'

export const Factory = (modules: Array<any>) => {
    const app = express();
    app.use(express.json());

    const listen = (port: number, callback?: () => void) => {
        modules.forEach(module => {
            if (Reflect.getMetadata('myNest-module', module)) {
                const controllers = Reflect.getMetadata('myNest-controllers', module);
                for (let j = 0; j < controllers.length; j++) {
                    let singletonProvider: any;
                    const tokens = Reflect.getMetadata('myNest-injectedByToken', controllers[j]) || new Map();
                    const singletonProviders = [];
                    const providers = Reflect.getMetadata('design:paramtypes', controllers[j]);

                    for (let k = 0; k < providers.length; k++) {
                        if (tokens.has(k)) {
                            singletonProvider = registrationSvc.getInstance(providers[k]);
                        } else {
                            singletonProvider = registrationSvc.getInstance(providers[k]);
                        }
                        singletonProviders.push(singletonProvider);
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
