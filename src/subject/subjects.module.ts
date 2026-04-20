import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { Module } from '../../my_nest/decorators/module';

@Module({
    controllers: [SubjectsController],
    providers: [
        {
            provide: 'SubjectsPlatform',
            useClass: SubjectsService
        }
    ],
    exports: [
        {
            provide: 'SubjectsPlatform',
            useClass: SubjectsService
        }
    ]
})
export class SubjectsModule { }
