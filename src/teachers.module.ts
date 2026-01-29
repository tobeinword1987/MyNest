import { TeachersController } from './teachers.controller.ts';
import { TeachersService } from './teachers.service.ts';
import { Module } from '../my_nest/decorators/module.ts';

@Module({
    controllers: [TeachersController],
    providers: [{
        provide: 'TeachersPlatform',
        useClass: TeachersService
    }]
})
export class TeachersModule { }
