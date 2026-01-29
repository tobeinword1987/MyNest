import { Router } from 'express';
export const routes = Router();


export const addRoute = (method: string, path: string, fnct: Function) => {
    routes[method](path, fnct);
}
