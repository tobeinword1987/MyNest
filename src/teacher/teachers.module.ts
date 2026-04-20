import { TeachersController } from './teachers.controller.ts';
import { TeachersService } from './teachers.service.ts';
import { Module } from '../../my_nest/decorators/module.ts';
import { SubjectsModule } from '../subject/subjects.module.ts';
import { TeachersServiceCustom } from './teachers.service.custom.ts';

@Module({
    imports: [SubjectsModule],
    controllers: [TeachersController],
    providers: [{
        provide: 'TeachersPlatform',
        useClass: TeachersService
    },
    {
        provide: 'TeachersPlatform1',
        useClass: TeachersServiceCustom
    }]
})
export class TeachersModule { }
