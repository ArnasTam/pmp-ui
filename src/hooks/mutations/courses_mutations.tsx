import { useMutation } from '@tanstack/react-query';
import useCoursesService from 'src/hooks/services/use_courses_service';
import CreateCourseRequest from 'src/models/http/courses/create_course_request';

export const useCreateCourseMutation = () => {
  const coursesService = useCoursesService();

  return useMutation({
    mutationFn: (data: CreateCourseRequest) =>
      coursesService.createCourse(data),
  });
};

export const useUpdateCourseMutation = () => {
  const coursesService = useCoursesService();

  return useMutation({
    mutationFn: (data: { id: string; course: CreateCourseRequest }) =>
      coursesService.updateCourse(data.id, data.course),
  });
};

export const useDeleteCourseMutation = () => {
  const coursesService = useCoursesService();

  return useMutation({
    mutationFn: (id: string) => coursesService.deleteCourse(id),
  });
};
