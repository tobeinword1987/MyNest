import { Request, Response } from "express";
import { Controller, Get, Post } from "../my_nest/decorators/index.ts";
import { StudentsService } from './students.service.ts'

@Controller('/students')
export class StudentsController {
    svc: StudentsService;
    constructor(public service: StudentsService) {
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
