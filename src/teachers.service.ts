import { Injectable } from '../my_nest/decorators/injectable.ts'

// @Injectable()
export class TeachersService {
    findAll () {
        return 'There is a list of all teachers';
    }

    create () {
        return 'New teacher was created';
    }
}
