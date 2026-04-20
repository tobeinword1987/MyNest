import { Injectable } from '../../my_nest/decorators/injectable.ts'
import { TeachersService } from './teachers.service.ts';

@Injectable()
export class TeachersServiceCustom extends TeachersService {
    findAll () {
        return 'There is a list of all custom teachers';
    }

    create () {
        return 'New custom teacher was created';
    }
}
