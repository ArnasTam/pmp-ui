import { CodeSubmissionResponse } from 'src/models/http/code_submissions/code_submission_response';
import CreateChallengeCodeSubmissionRequest from 'src/models/http/code_submissions/create_challenge_code_submission_request';
import HttpClient from 'src/services/http_client';

class ChallengeCodeSubmissionsService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/challenge-code-submissions';
  }

  public async createCodeSubmission(
    data: CreateChallengeCodeSubmissionRequest,
  ): Promise<CodeSubmissionResponse> {
    return this._httpClient.post<CodeSubmissionResponse>(this._endpoint, {
      ...data,
    });
  }
}

export default ChallengeCodeSubmissionsService;
