export enum TestCaseResultStatus {
  PASS,
  FAIL,
  ERROR,
}

export interface TestCaseResult {
  id: string;
  error: string;
  expectedOutput: string;
  output: string;
  compileOutput: string;
  status: TestCaseResultStatus;
}
