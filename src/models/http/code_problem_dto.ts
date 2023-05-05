import TestCase from 'src/models/course_lesson_test_case';
import { AllowedCodeLanguagesDto } from 'src/models/http/allowed_code_languages_dto';

export interface CodeProblemDto {
  id: string;
  title: string;
  descriptionRichText: string;
  codeEditorTemplate: string;
  allowedCodeLanguages: AllowedCodeLanguagesDto[];
  testCases: TestCase[];
}
