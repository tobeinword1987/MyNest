import express from 'express';
import { addRoute, routes } from './routes.ts'
import { registrationSvc } from './registration.service.ts'

export const Factory = (modules: Array<any>) => {
    const app = express()

    const listen = (port: number, callback?: () => void) => {
        modules.forEach(module => {
            if (Reflect.getMetadata('myNest-module', module)) {
                const providers = Reflect.getMetadata('myNest-providers', module);
                const controllers = Reflect.getMetadata('myNest-controllers', module);
                for (let j = 0; j < controllers.length; j++) {
                    let singletonProvider: any;
                    const token = Reflect.getMetadata('myNest-injectedByToken', controllers[j])
                    if(token) {
                         if (token === providers[j].provide) {
                            singletonProvider = registrationSvc.getInstance(providers[j].useClass);
                         } else {
                            throw new Error(`Token in ${controllers[j].name} is not the same as mentioned in provider from module`);
                         }
                    } else  {
                        singletonProvider = registrationSvc.getInstance(providers[j]);
                    }
                    const contr = new controllers[j](singletonProvider)
                    const baseRoute = Reflect.getMetadata('myNest-baseRoute', controllers[j]) || '';
                    const routes = Reflect.getMetadata('myNest-routes', controllers[j]);
                    routes.forEach(route => {
                        const fullRoute = baseRoute + route.route;
                        addRoute(route.method, fullRoute, route.func.bind(contr));
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
