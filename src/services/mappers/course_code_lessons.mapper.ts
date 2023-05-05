import CourseLesson from 'src/models/course_lesson';
import { CourseCodeLessonResponse } from 'src/models/http/course_lessons/course_code_lesson_response';

const mapCourseCodeLessonResponseToCourseCodeLesson = (
  input: CourseCodeLessonResponse,
): CourseLesson => ({
  allowedCodeLanguageIds: input.codeProblem.allowedCodeLanguages.map(
    (language) => language.id,
  ),
  codeEditorTemplate: input.codeProblem.codeEditorTemplate,
  descriptionRichText: input.codeProblem.descriptionRichText,
  id: input.id,
  lessonNr: input.lessonNr,
  testCases: input.codeProblem.testCases,
  title: input.codeProblem.title,
  codeProblemId: input.codeProblem.id,
  prevLessonId: input.prevLessonId,
  nextLessonId: input.nextLessonId,
});

export default mapCourseCodeLessonResponseToCourseCodeLesson;
