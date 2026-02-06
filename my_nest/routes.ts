import { Request, Response, Router } from 'express';
export const routes = Router();

export const addRoute = (method: string, path: string, fnct: Function, f, instance) => {
    routes[method](
        path,
        asyncHandler(fnct, f, instance),
    );
}

export const asyncHandler = (fn: Function, f, instance) => (req: Request, res: Response) => {
    try {
        const params = [];
        console.log('@@@@1111', Reflect.getMetadata('mini:params', instance));
        const parameters = Reflect.getMetadata('mini:params', instance);
        parameters?.forEach(parameter => {
            if ((parameter.name === f.name) && (parameter.type === 'body')) {
                if (parameter.param) {
                    params[parameter.index] = req.body[parameter.param];
                } else {
                    params[parameter.index] = req.body;
                }

            }
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~', parameter.name, f.name, parameter.type, req.query);
            if ((parameter.name === f.name) && (parameter.type === 'query')) {
                if (parameter.param) {
                    params[parameter.index] = req.query[parameter.param];
                } else {
                    params[parameter.index] = req.query;
                }
            }
        })
        for (let key in req.params) {
            params.push(req.params[key]);
        }
        console.log('~~~~~~~~~~~~~~~', params);
        res.send(fn(...params));
    } catch (error) {
        res.status(error.cause.status).json({ message: error.message });
    }
}
