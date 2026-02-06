import { Injectable } from '../my_nest/decorators/injectable.ts'
import { students } from './students.dto.ts'

@Injectable()
export class StudentsService {
    findAll() {
        const listStudents = [];
        students.forEach(student => {
            listStudents.push({ id: student.id, name: student.name });
        })
        return listStudents;
    }

    findSubjects(query: { subject: string }) {
        if (!query?.subject) {
            throw new Error('There is no subject in query parameter', { cause: { status: 400 } });
        }
        return `Report about subject ${query.subject}`
    }

    getReportBySubject(subject: string) {
        if (!subject) {
            throw new Error('There is no subject in query parameter', { cause: { status: 400 } });
        }
        return `Report about subject ${subject}`
    }

    showStudent(id: string, name: string) {
        if (!students.has(id)) {
            throw new Error(`There is no student with id=${id}`, { cause: { status: 404 } });
        }
        return `There is a student with id ${id} and name ${name}`;
    }

    create(studentData: { name: string }) {
        return `The tudent was created with the name ${studentData.name}`;
    }

    addScholarship(scholarship: number, name: string) {
        return `The student ${name} has had got scholarship: ${scholarship} euros`
    }

    update() {
        return 'New student was updated';
    }

    delete(id: string) {
        return `Student with ${id} was deleted`;
    }
}
