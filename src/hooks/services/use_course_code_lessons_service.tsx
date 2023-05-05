import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import CourseCodeLessonsService from 'src/services/course_code_lessons.service';

const useCourseCodeLessonsService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new CourseCodeLessonsService(httpClient), [httpClient]);
};

export default useCourseCodeLessonsService;
