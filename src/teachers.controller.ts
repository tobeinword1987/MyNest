import { Request, Response } from "express";
import { Inject } from '../my_nest/decorators/inject.ts'
import { Controller, Get, Post } from "../my_nest/decorators/index.ts";
import { TeachersService } from './teachers.service.ts'
import { SubjectsService } from "./subjects.service.ts";

@Controller('/teachers')
export class TeachersController {

    // It can be used with @Injected and without @Injected decorators
    // constructor(@Inject('TeachersPlatform') public teachersService: TeachersService, @Inject('SubjectsPlatform') public subjectsService: SubjectsService) {}
    constructor(public teachersService: TeachersService, public subjectsService: SubjectsService) { }


    @Get('/')
    list(req: Request, res: Response) {
        res.send(this.teachersService.findAll());
    }

    @Post('/')
    create(req: Request, res: Response) {
        res.send(this.teachersService.create());
    }

    @Get('/subjects')
    listSubjects(req: Request, res: Response) {
        res.send(this.subjectsService.findAll());
    }

    @Post('/subjects')
    createSubject(req: Request, res: Response) {
        res.send(this.subjectsService.create());
    }
}
