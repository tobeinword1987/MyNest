import { Injectable } from '../my_nest/decorators/injectable.ts'

@Injectable()
export class SubjectsService {
    findAll() {
        return 'There is a list of all subjects';
    }

    create() {
        return 'New subject was added';
    }
}
