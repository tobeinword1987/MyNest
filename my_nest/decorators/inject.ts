import { registrationSvc } from '../registration.service.ts'

export const Inject = (token: string) => {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const tokens = Reflect.getMetadata('myNest-injectedByToken', target) || new Map();
        tokens.set(parameterIndex, token);
        Reflect.defineMetadata('myNest-injectedByToken', tokens, target);
    }
}
