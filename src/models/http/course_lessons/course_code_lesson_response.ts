import { CodeProblemDto } from 'src/models/http/code_problem_dto';

export interface CourseCodeLessonResponse {
  id: string;
  lessonNr: number;
  codeProblem: CodeProblemDto;
  nextLessonId?: string;
  prevLessonId?: string;
}
