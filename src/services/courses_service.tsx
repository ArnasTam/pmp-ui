import Course from 'src/models/course';
import CreateCourseRequest from 'src/models/http/courses/create_course_request';
import { ListResponse } from 'src/models/http/list_response';
import HttpClient from 'src/services/http_client';

class CoursesService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/courses';
  }

  public async getCourses(): Promise<Course[]> {
    const response = await this._httpClient.get<ListResponse<Course>>(
      this._endpoint,
    );
    return response.data;
  }

  public async getCoursesByAuthorId(authorId: string): Promise<Course[]> {
    const response = await this._httpClient.get<ListResponse<Course>>(
      `${this._endpoint}?authorId=${authorId}`,
    );
    return response.data;
  }

  public async getCourseById(id: string): Promise<Course> {
    return this._httpClient.get<Course>(`${this._endpoint}/${id}`);
  }

  public async createCourse(
    createCourseData: CreateCourseRequest,
  ): Promise<Course> {
    return this._httpClient.post<Course>(this._endpoint, createCourseData);
  }

  public async updateCourse(
    id: string,
    createCourseData: CreateCourseRequest,
  ): Promise<Course> {
    return this._httpClient.put<Course>(
      `${this._endpoint}/${id}`,
      createCourseData,
    );
  }

  public async deleteCourse(id: string): Promise<Course> {
    return this._httpClient.delete<Course>(`${this._endpoint}/${id}`);
  }
}

export default CoursesService;
