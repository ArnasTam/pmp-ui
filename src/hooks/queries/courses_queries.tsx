import { useQuery } from '@tanstack/react-query';
import useCoursesService from 'src/hooks/services/use_courses_service';

enum CoursesQueryKeys {
  GET_COURSES = 'get-courses',
  GET_COURSE_BY_ID = 'get-course-by-id',
  GET_COURSES_BY_AUTHOR_ID = 'get-courses-by-author-id',
}

export const useGetCoursesQuery = () => {
  const coursesService = useCoursesService();

  return useQuery({
    queryKey: [CoursesQueryKeys.GET_COURSES],
    queryFn: () => coursesService.getCourses(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useGetCoursesByAuthorIdQuery = (authorId: string) => {
  const coursesService = useCoursesService();

  return useQuery({
    queryKey: [CoursesQueryKeys.GET_COURSES_BY_AUTHOR_ID],
    queryFn: () => coursesService.getCoursesByAuthorId(authorId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useGetCourseByIdQuery = (id: string) => {
  const coursesService = useCoursesService();

  return useQuery({
    queryKey: [CoursesQueryKeys.GET_COURSE_BY_ID, id],
    queryFn: () => coursesService.getCourseById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
