import CourseTag from 'src/models/course_tag';
import GetCourseTagsResponse from 'src/models/http/course_tags/get_course_tags_response';
import HttpClient from 'src/services/http_client';

class CourseTagsService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/course-tags';
  }

  public async getCourseTags(): Promise<CourseTag[]> {
    const { data } = await this._httpClient.get<GetCourseTagsResponse>(
      this._endpoint,
    );
    return data;
  }
}

export default CourseTagsService;
