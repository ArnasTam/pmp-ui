import TestCase from 'src/models/course_lesson_test_case';

export interface CourseLesson {
  id: string;
  title: string;
  descriptionRichText?: string;
  codeEditorTemplate: string;
  allowedCodeLanguageIds: string[];
  testCases: TestCase[];
  lessonNr: number;
  codeProblemId?: string;
  prevLessonId?: string;
  nextLessonId?: string;
}

export default CourseLesson;
