import { registrationSvc } from '../registration.service.ts'

export const Inject = (token: string) => {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        Reflect.defineMetadata('myNest-injectedByToken', token, target);
    }
}
