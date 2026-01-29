import "reflect-metadata";
import { Factory } from './my_nest/factory.ts'
import { StudentsModule } from './src/students.module.ts';
import { TeachersModule } from './src/teachers.module.ts';

const app = Factory([StudentsModule, TeachersModule]);

const port = 8000;

app.listen(port, () => console.log(`MyNest listening on http://localhost:${port}`))
