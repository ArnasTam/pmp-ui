import { useQuery } from '@tanstack/react-query';
import useCourseTagsService from 'src/hooks/services/use_course_tags_service';

enum CourseTagsQueryKeys {
  GET_COURSE_TAGS = 'get-course-tags',
}

const useGetCourseTagsQuery = () => {
  const courseTagsService = useCourseTagsService();

  return useQuery({
    queryKey: [CourseTagsQueryKeys.GET_COURSE_TAGS],
    queryFn: () => courseTagsService.getCourseTags(),
    refetchOnWindowFocus: false,
  });
};

export default useGetCourseTagsQuery;
