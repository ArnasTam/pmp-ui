import { useQuery } from '@tanstack/react-query';
import useCourseCodeLessonsService from 'src/hooks/services/use_course_code_lessons_service';

enum CourseCodeLessonsQueryKeys {
  GET_BY_COURSE_ID = 'get-by-course-id',
  GET_BY_ID = 'get-by-id',
}

export const useGetCodeLessonsByCourseIdQuery = (courseId: string) => {
  const courseCodeLessonsService = useCourseCodeLessonsService();

  return useQuery({
    queryKey: [CourseCodeLessonsQueryKeys.GET_BY_COURSE_ID, courseId],
    queryFn: () =>
      courseCodeLessonsService.getCourseCodeLessonsByCourseId(courseId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useGetCodeLessonByIdQuery = (id: string, courseId: string) => {
  const courseCodeLessonsService = useCourseCodeLessonsService();

  return useQuery({
    queryKey: [CourseCodeLessonsQueryKeys.GET_BY_ID, id, courseId],
    queryFn: () =>
      courseCodeLessonsService.getCourseCodeLessonById(id, courseId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
