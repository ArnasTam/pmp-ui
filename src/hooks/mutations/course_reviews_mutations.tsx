import { useMutation } from '@tanstack/react-query';
import useCourseReviewsService from 'src/hooks/services/use_course_reviews_service';
import CreateCourseReviewRequest from 'src/models/http/course_reviews/create_course_review_request';
import UpdateCourseReviewRequest from 'src/models/http/course_reviews/update_course_review_request';

export const useCreateCourseReviewMutation = () => {
  const courseReviewsService = useCourseReviewsService();

  return useMutation({
    mutationFn: (data: CreateCourseReviewRequest) =>
      courseReviewsService.createCourseReview(data),
  });
};

export const useUpdateCourseReviewMutation = () => {
  const courseReviewsService = useCourseReviewsService();

  return useMutation({
    mutationFn: (data: { id: string; review: UpdateCourseReviewRequest }) =>
      courseReviewsService.updateCourseReview(data.id, data.review),
  });
};

export const useDeleteCourseReviewMutation = () => {
  const courseReviewsService = useCourseReviewsService();

  return useMutation({
    mutationFn: (id: string) => courseReviewsService.deleteCourseReview(id),
  });
};
