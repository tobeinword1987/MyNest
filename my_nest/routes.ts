import { Request, Response, Router } from 'express';
export const routes = Router();

export const addRoute = (method: string, path: string, fnct: Function, f, instance) => {
    routes[method](
        path,
        asyncHandler(fnct, f, instance)
    );
}

export const asyncHandler = (fn: Function, f, instance) => (req: Request, res: Response) => {
    try {
        const params = [];
        const parameters = Reflect.getMetadata('mini:params', instance);
        console.log(parameters);
        parameters?.forEach(parameter => {
            if ((parameter.name === f.name) && (parameter.type === 'param')) {
                if (parameter.param) {
                    params[parameter.index] = req.params[parameter.param];
                }
                else {
                    params[parameter.index] = req.params;
                }
            }
            if ((parameter.name === f.name) && (parameter.type === 'body')) {
                if (parameter.param) {
                    params[parameter.index] = req.body[parameter.param];
                } else {
                    params[parameter.index] = req.body;
                }

            }
            if ((parameter.name === f.name) && (parameter.type === 'query')) {
                if (parameter.param) {
                    params[parameter.index] = req.query[parameter.param];
                } else {
                    params[parameter.index] = req.query;
                }
            }
        })
        res.send(fn(...params));
    } catch (error) {
        console.log(error);
        res.status(error.status);
        res.json({ message: error.message });
    }
}
