import { CodeSubmissionResponse } from 'src/models/http/code_submissions/code_submission_response';
import CreateCodeSubmissionRequest from 'src/models/http/code_submissions/create_course_code_submission_request';
import HttpClient from 'src/services/http_client';

class CourseCodeSubmissionsService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/course-code-submissions';
  }

  public async createCodeSubmission(
    data: CreateCodeSubmissionRequest,
  ): Promise<CodeSubmissionResponse> {
    return this._httpClient.post<CodeSubmissionResponse>(this._endpoint, {
      ...data,
    });
  }
}

export default CourseCodeSubmissionsService;
