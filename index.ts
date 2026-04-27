import "reflect-metadata";
import { Factory } from './my_nest/factory.ts'
import { StudentsModule } from './src/students/students.module.ts';
import { TeachersModule } from './src/teacher/teachers.module.ts';
import { SubjectsModule } from './src/subject/subjects.module.ts';
import { createStudentSchema } from "./schemas/schema.ts";
import { ZodValidationPipe } from "./pipes/zodValidationPipe.ts";

const app = Factory([StudentsModule, TeachersModule, SubjectsModule]);

// app.useGlobalPipes(new ZodValidationPipe(createStudentSchema));

const port = 8000;

app.listen(port, () => console.log(`MyNest listening on http://localhost:${port}`));
