import { CourseReview } from 'src/models/course_review';
import CreateCourseReviewRequest from 'src/models/http/course_reviews/create_course_review_request';
import UpdateCourseReviewRequest from 'src/models/http/course_reviews/update_course_review_request';
import { ListResponse } from 'src/models/http/list_response';
import HttpClient from 'src/services/http_client';

class CourseReviewsService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/course-reviews';
  }

  public async getCourseReviews(courseId: string): Promise<CourseReview[]> {
    const response = await this._httpClient.get<ListResponse<CourseReview>>(
      `${this._endpoint}?courseId=${courseId}`,
    );
    return response.data;
  }

  public async createCourseReview(
    createCourseReviewData: CreateCourseReviewRequest,
  ): Promise<CourseReview> {
    return this._httpClient.post<CourseReview>(
      this._endpoint,
      createCourseReviewData,
    );
  }

  public async updateCourseReview(
    id: string,
    createCourseReviewData: UpdateCourseReviewRequest,
  ): Promise<CourseReview> {
    return this._httpClient.put<CourseReview>(
      `${this._endpoint}/${id}`,
      createCourseReviewData,
    );
  }

  public async deleteCourseReview(id: string): Promise<CourseReview> {
    return this._httpClient.delete<CourseReview>(`${this._endpoint}/${id}`);
  }
}

export default CourseReviewsService;
