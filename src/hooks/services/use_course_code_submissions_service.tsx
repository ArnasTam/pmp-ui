import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import CourseCodeSubmissionsService from 'src/services/course_code_submissions.service';

const useCourseCodeSubmissionsService = () => {
  const httpClient = useHttpClient();
  return useMemo(
    () => new CourseCodeSubmissionsService(httpClient),
    [httpClient],
  );
};

export default useCourseCodeSubmissionsService;
