import { Request, Response, Router } from 'express';
import { HttpException, HttpStatus } from './http.exception';
export const routes = Router();

const getParamsOnMethod = (instance, f, req) => {
    const params = [];
    const pipes = new Map();
    const parameters = Reflect.getMetadata('mini:params', instance);
    console.log('******', parameters);
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
        if (parameter.pipe) {
            Reflect.defineMetadata('PIPE_METADATA_PARAM', parameter.pipe, parameter)
            pipes.set(parameter.index, parameter.pipe);
        }
    })
    console.log('))))))', params);
    return { params, pipes };
}

export const addRoute = (method: string, path: string, fnct: Function, f, instance, app) => {

    routes[method](
        path,
        (req, res, next) => {
            const pipeMetadataMethod = Reflect.getMetadata('PIPE_METADATA', f);
            const pipeMetadataController = Reflect.getMetadata('PIPE_METADATA_CONTROLLER', instance)
            const pipeMetadataGlobal = Reflect.getMetadata('PIPE_METADATA_GLOBAL', app)

            if (pipeMetadataGlobal) {
                checkPipesValidation(req, f, instance, pipeMetadataGlobal);
            }
            if (pipeMetadataController) {
                checkPipesValidation(req, f, instance, pipeMetadataController);
            }
            if (pipeMetadataMethod) {
                checkPipesValidation(req, f, instance, pipeMetadataMethod);
            }
            checkPipesValidationParamsOnMethod(req, f, instance);

            next();
        },
        asyncHandler(fnct, f, instance)
    );
}

export const checkPipesValidation = (req: Request, f: Function, instance, pipeMetadata) => {
    const parameters = Reflect.getMetadata('mini:params', instance);
    console.log(parameters);

    const { params } = getParamsOnMethod(instance, f, req);

    params.forEach(param => {
        try {
            pipeMetadata.transform(param);
        } catch (error) {
            throw new HttpException(`Wrong type, ${JSON.stringify(param)}`, HttpStatus.BAD_REQUEST);
        }
    });
}

export const checkPipesValidationParamsOnMethod = (req: Request, f: Function, instance) => {
    const parameters = Reflect.getMetadata('mini:params', instance);
    console.log(parameters);

    const { params, pipes } = getParamsOnMethod(instance, f, req);

    parameters.forEach(parameter => {
        try {
            const pipeOnParam = Reflect.getMetadata('PIPE_METADATA_PARAM', parameter);
            console.log(parameter, params[parameter.index]);
            if (pipeOnParam && f.name === parameter.name) {
                pipeOnParam.transform(params[parameter.index])
            }
        } catch (error) {
            throw new HttpException(`Wrong type, ${JSON.stringify(params[parameter.index])}`, HttpStatus.BAD_REQUEST);
        }
    })
}

export const asyncHandler = (fn: Function, f, instance) => (req: Request, res: Response) => {
    try {
        const { params } = getParamsOnMethod(instance, f, req);
        res.send(fn(...params));
    } catch (error) {
        console.log(error);
        res.status(error.status);
        res.json({ message: error.message });
    }
}
