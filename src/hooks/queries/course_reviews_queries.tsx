import { useQuery } from '@tanstack/react-query';
import useCourseReviewsService from 'src/hooks/services/use_course_reviews_service';

enum CourseReviewsQueryKeys {
  GET_COURSE_REVIEWS = 'get-course-reviews',
}

const useGetCourseReviewsQuery = (courseId: string) => {
  const courseReviewsService = useCourseReviewsService();

  return useQuery({
    queryKey: [CourseReviewsQueryKeys.GET_COURSE_REVIEWS, courseId],
    queryFn: () => courseReviewsService.getCourseReviews(courseId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export default useGetCourseReviewsQuery;
