import { CourseProgress } from 'src/models/course_progress';
import CreateCourseProgressRequest from 'src/models/http/course_progress/create_course_progress_request';
import HttpClient from 'src/services/http_client';

class CourseProgressService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/course-progress';
  }

  public async getCourseProgress(): Promise<Map<string, CourseProgress>> {
    const data = await this._httpClient.get<Map<string, CourseProgress>>(
      this._endpoint,
    );
    return new Map<string, CourseProgress>(Object.entries(data));
  }

  public async createCourseProgress(
    data: CreateCourseProgressRequest,
  ): Promise<void> {
    return this._httpClient.post(this._endpoint, {
      ...data,
    });
  }
}

export default CourseProgressService;
