import { Body, Controller, Get, Param, Post, Put, Delete, Query, UsePipes } from "../../my_nest/decorators/index.ts";
import { StudentsService } from './students.service.ts'
import { ZodValidationPipe } from "../../pipes/zodValidationPipe.ts";
import { createStudentSchema, StudentDto } from "../../schemas/schema.ts";

@Controller('/students')
@UsePipes(new ZodValidationPipe(createStudentSchema))
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
        return this.svc.addScholarship(scholarship, name);
    }

    @Post('/name1/:name')
    addScholarship1(@Body('scholarship') scholarship: number, @Param() studentName: StudentDto): string {
        return this.svc.addScholarship(scholarship, studentName.name);
    }

    @Delete('/:id')
    delete(id: string) {
        return this.svc.delete(id);
    }

    @Post('/add')
    @UsePipes(new ZodValidationPipe(createStudentSchema))
    add(@Body() studentData: { name: string }) {
    return this.svc.create(studentData);
    }
}
