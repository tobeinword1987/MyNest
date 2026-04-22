import { Request, Response, Router } from 'express';
import { HttpException, HttpStatus } from './http.exception';
export const routes = Router();

const getParamsOnMethod = (instance, f, req) => {
    const params = [];
    const parameters = Reflect.getMetadata('mini:params', instance);
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
    console.log('))))))', params);
    return params;
}

export const addRoute = (method: string, path: string, fnct: Function, f, instance, app) => {

    routes[method](
        path,
        (req, res, next) => {
            const pipeMetadataMethod = Reflect.getMetadata('PIPE_METADATA', f);
            const pipeMetadataController = Reflect.getMetadata('PIPE_METADATA_CONTROLLER', instance)
            const pipeMetadataGlobal = Reflect.getMetadata('PIPE_METADATA_GLOBAL', app)
            // console.log('-------pipeMetadataController------', pipeMetadataController);
            // console.log('-------pipeMetadataMethod------', pipeMetadataMethod);
            // console.log('-------pipeMetadataGlobal------', pipeMetadataGlobal);

            if (pipeMetadataGlobal) {
                checkPipesValidation(req, f, instance, pipeMetadataGlobal);
            }
            if (pipeMetadataController) {
                checkPipesValidation(req, f, instance, pipeMetadataController);
            }
            if (pipeMetadataMethod) {
                checkPipesValidation(req, f, instance, pipeMetadataMethod);
            }

            next();
        },
        asyncHandler(fnct, f, instance)
    );
}

export const checkPipesValidation = (req: Request, f: Function, instance, pipeMetadata) => {
    const parameters = Reflect.getMetadata('mini:params', instance);
    console.log(parameters);

    const params = getParamsOnMethod(instance, f, req);

    params.forEach(param => {
        try {
            pipeMetadata.transform(param);
        } catch (error) {
            throw new HttpException(`Wrong type, ${JSON.stringify(param)}`, HttpStatus.BAD_REQUEST);
        }
    });
}

export const asyncHandler = (fn: Function, f, instance) => (req: Request, res: Response) => {
    try {
        const params = getParamsOnMethod(instance, f, req);
        console.log('call---------------')
        res.send(fn(...params));
    } catch (error) {
        console.log(error);
        res.status(error.status);
        res.json({ message: error.message });
    }
}
