import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import CourseReviewsService from 'src/services/course_reviews.service';

const useCourseReviewsService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new CourseReviewsService(httpClient), [httpClient]);
};

export default useCourseReviewsService;
