import { Request, Response } from "express";
import { Inject } from '../../my_nest/decorators/inject.ts'
import { Controller, Body, Get, Post } from "../../my_nest/decorators/index.ts";
import { TeachersService } from './teachers.service.ts'
import { SubjectsService } from "../subject/subjects.service.ts";

@Controller('/teachers')
export class TeachersController {

    constructor(
        @Inject('TeachersPlatform') public teachersService: TeachersService,
        @Inject('TeachersPlatform1') public teachersServiceCustom: TeachersService,
        public subjectsService: SubjectsService) { }

    @Get('/')
    list() {
        return this.teachersService.findAll();
    }

    @Get('/custom')
    listCustom() {
        return this.teachersServiceCustom.findAll();
    }

    @Post('/')
    create() {
        return this.teachersService.create();
    }

    @Get('/subjects')
    listSubjects() {
        return this.subjectsService.findAll();
    }

    @Post('/subjects')
    createSubject(@Body() subjectstData: { name: string }) {
        return this.subjectsService.create(subjectstData);
    }
}
