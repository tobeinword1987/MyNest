import { Request, Response } from "express";
import { Body, Controller, Get, Post, Put, Delete, Query } from "../my_nest/decorators/index.ts";
import { StudentsService } from './students.service.ts'

@Controller('/students')
export class StudentsController {
    svc: StudentsService;
    constructor(public service: StudentsService) {
        this.svc = service;
    }

    @Get('/')
    list() {
        return this.svc.findAll();
    }

    @Get('/homeworks')
    findSubjects(@Query() query: { subject: string }) {
        return this.svc.findSubjects(query);
    }

    @Get('/homeworks1')
    getReportBySubject(@Query('subject') subject: string) {
        return this.svc.getReportBySubject(subject);
    }

    @Get('/:id/name/:name')
    showStudent(id: string, name: string) {
        return this.svc.showStudent(id, name);
    }

    @Post('/')
    create(@Body() studentData: { name: string }): string {
        return this.svc.create(studentData);
    }

    @Post('/:name')
    addScholarship(@Body('scholarship') scholarship: number, name: string): string {
        return this.svc.addScholarship(scholarship, name);
    }

    @Put('/')
    update() {
        return this.svc.update();
    }

    @Delete('/:id')
    delete(id: string) {
        return this.svc.delete(id);
    }

    //   @Post('/')
    //   @UsePipes(ZodValidationPipe)
    //   add(@Body() body: { title: string }) {
    //     return this.svc.create(body.title);
    //   }
}
