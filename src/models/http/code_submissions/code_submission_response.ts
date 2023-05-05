import { TestCaseResult } from 'src/models/http/code_submissions/test_case_result';

export enum CodeSubmissionResultsStatus {
  SUCCESS,
  FAILURE,
}

export interface CodeSubmissionResponse {
  id: string;
  status: CodeSubmissionResultsStatus;
  testCaseResults: TestCaseResult[];
}
