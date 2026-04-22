import { Request, Response } from "express";
import { Body, Controller, Get, Post, Put, Delete, Query } from "../../my_nest/decorators/index.ts";
import { SubjectsService } from '../subject/subjects.service.ts'

@Controller('/subjects')
export class SubjectsController {
    constructor(public service: SubjectsService) {}

    @Get('/')
    list() {
        return this.service.findAll();
    }

    @Post('/')
    create(@Body() subjectstData: { name: string }): string {
        return this.service.create(subjectstData);
    }
}
