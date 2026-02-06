import { TeachersController } from './teachers.controller.ts';
import { TeachersService } from './teachers.service.ts';
import { Module } from '../my_nest/decorators/module.ts';
import { SubjectsService } from './subjects.service.ts';

@Module({
    controllers: [TeachersController],
    providers: [{
        provide: 'TeachersPlatform',
        useClass: TeachersService
    },
    {
        provide: 'SubjectsPlatform',
        useClass: SubjectsService
    }
    ]
})
export class TeachersModule { }
