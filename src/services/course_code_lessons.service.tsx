import CourseLesson from 'src/models/course_lesson';
import { CourseCodeLessonResponse } from 'src/models/http/course_lessons/course_code_lesson_response';
import { ListResponse } from 'src/models/http/list_response';
import HttpClient from 'src/services/http_client';
import mapCourseCodeLessonResponseToCourseCodeLesson from 'src/services/mappers/course_code_lessons.mapper';

class CourseCodeLessonsService {
  private _httpClient: HttpClient;
  constructor(client: HttpClient) {
    this._httpClient = client;
  }

  public async getCourseCodeLessonsByCourseId(
    courseId: string,
  ): Promise<CourseLesson[]> {
    const response = await this._httpClient.get<
      ListResponse<CourseCodeLessonResponse>
    >(`/courses/${courseId}/code-lessons`);

    return response.data.map((lesson) =>
      mapCourseCodeLessonResponseToCourseCodeLesson(lesson),
    );
  }

  public async getCourseCodeLessonById(
    id: string,
    courseId: string,
  ): Promise<CourseLesson> {
    const response = await this._httpClient.get<CourseCodeLessonResponse>(
      `/courses/${courseId}/code-lessons/${id}`,
    );

    return mapCourseCodeLessonResponseToCourseCodeLesson(response);
  }
}

export default CourseCodeLessonsService;
