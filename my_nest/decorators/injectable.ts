import { registrationSvc } from '../registration.service.ts'

export const Injectable = () => {
    return function (target: any) {
        registrationSvc.createInstance(target);
    }
}
