import { useQuery } from '@tanstack/react-query';
import useCourseProgressService from 'src/hooks/services/use_course_progress_service';

enum CourseProgressQueryKeys {
  GET_CODE_PROGRESS_BY_COURSE_IDS = 'GET_CODE_PROGRESS_BY_COURSE_IDS',
}

const useGetCourseCodeProgress = () => {
  const courseProgressService = useCourseProgressService();

  return useQuery({
    queryKey: [CourseProgressQueryKeys.GET_CODE_PROGRESS_BY_COURSE_IDS],
    queryFn: () => courseProgressService.getCourseProgress(),
    refetchOnWindowFocus: false,
  });
};

export default useGetCourseCodeProgress;
