import { Request, Response } from "express";
import { Inject } from '../my_nest/decorators/inject.ts'
import { Controller, Get, Post } from "../my_nest/decorators/index.ts";
import { TeachersService } from './teachers.service.ts'

@Controller('/teachers')
export class TeachersController {
    svc: TeachersService;
    constructor(@Inject('TeachersPlatform1') public service: TeachersService) {
        this.svc = service;
    }


    @Get('/')
    list(req: Request, res: Response) {
        res.send(this.svc.findAll());
    }

    @Post('/')
    create(req: Request, res: Response) {
        res.send(this.svc.create());
    }

    //   @Get('/:id')
    //   one(@Param('id') id:string) {
    //     return this.svc.findOne(+id);
    //   }

    //   @Post('/')
    //   @UsePipes(ZodValidationPipe)
    //   add(@Body() body: { title: string }) {
    //     return this.svc.create(body.title);
    //   }
}
