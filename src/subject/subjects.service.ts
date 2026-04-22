import { Injectable } from '../../my_nest/decorators/injectable.ts'

@Injectable()
export class SubjectsService {
    findAll() {
        return 'There is a list of all subjects';
    }

    create(subjectsData: { name: string }) {
        return `New subject ${subjectsData.name} was added`;
    }
}
