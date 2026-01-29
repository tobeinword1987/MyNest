import { Injectable } from '../my_nest/decorators/injectable.ts'

@Injectable()
export class StudentsService {
    findAll () {
        return 'There is a list of all students';
    }

    create () {
        return 'New student was created';
    }
}
