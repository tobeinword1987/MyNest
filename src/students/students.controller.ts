import { Request, Response } from "express";
import { Body, Controller, Get, Param, Post, Put, Delete, Query } from "../../my_nest/decorators/index.ts";
import { StudentsService } from './students.service.ts'
import { ZodValidationPipe } from "../../pipes/zodValidationPipe.ts";
import { UsePipes } from "@nestjs/common";

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

    @Put('/')
    update() {
        return this.svc.update();
    }

    @Post('/')
    create(@Body() studentData: { name: string }): string {
        return this.svc.create(studentData);
    }

    @Get('/homeworks')
    findSubjects(@Query() query: { subject: string }) {
        return this.svc.findSubjects(query);
    }

    @Get('/homeworks1')
    getReportBySubject(@Query('subject') subject: string) {
        return this.svc.getReportBySubject(subject);
    }

    @Get('/id/:id')
    showStudent(@Param('id') id: string) {
        console.log('id', id);
        return this.svc.showStudent(id);
    }

    @Post('/name/:name')
    addScholarship(@Body('scholarship') scholarship: number, @Param('name') name: string): string {
        console.log('**********');
        return this.svc.addScholarship(scholarship, name);
    }

    @Post('/name1/:name')
    addScholarship1(@Body('scholarship') scholarship: number, @Param() studentName: { name: string }): string {
        console.log('**********');
        return this.svc.addScholarship(scholarship, studentName.name);
    }

    @Delete('/:id')
    delete(id: string) {
        return this.svc.delete(id);
    }

      @Post('/add')
      @UsePipes(ZodValidationPipe)
      add(@Body() studentData: { name: string }) {
        return this.svc.create(studentData);
      }
}
