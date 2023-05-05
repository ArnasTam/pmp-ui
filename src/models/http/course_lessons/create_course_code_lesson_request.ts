import TestCase from 'src/models/course_lesson_test_case';

export interface CreateCourseCodeLessonRequest {
  id: string;
  title: string;
  descriptionRichText?: string;
  codeEditorTemplate: string;
  allowedCodeLanguageIds: string[];
  testCases: TestCase[];
  lessonNr: number;
}

export default CreateCourseCodeLessonRequest;
