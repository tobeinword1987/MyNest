import { StudentsController } from './students.controller.ts';
import { StudentsService } from './students.service.ts';
import { Module } from '../my_nest/decorators/module.ts';

@Module({
    controllers: [StudentsController],
    providers: [StudentsService]
})
export class StudentsModule { }
