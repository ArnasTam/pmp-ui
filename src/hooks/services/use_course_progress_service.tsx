import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import CourseProgressService from 'src/services/course_progress.service';

const useCourseProgressService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new CourseProgressService(httpClient), [httpClient]);
};

export default useCourseProgressService;
