import TestCase from 'src/models/course_lesson_test_case';
import User from 'src/models/user';
import Difficulty from 'src/types/course_difficulty';

export interface Challenge {
  id: string;
  title: string;
  descriptionRichText: string;
  codeEditorTemplate: string;
  testCases: TestCase[];
  allowedCodeLanguageIds: string[];
  author: User;
  difficulty: Difficulty;
  codeProblemId?: string;
}
