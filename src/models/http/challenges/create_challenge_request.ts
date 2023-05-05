import TestCase from 'src/models/course_lesson_test_case';
import Difficulty from 'src/types/course_difficulty';

export interface CreateChallengeRequest {
  title: string;
  descriptionRichText?: string;
  codeEditorTemplate: string;
  allowedCodeLanguageIds: string[];
  testCases: TestCase[];
  difficulty: Difficulty;
}
