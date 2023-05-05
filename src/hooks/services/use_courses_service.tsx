import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import CoursesService from 'src/services/courses_service';

const useCoursesService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new CoursesService(httpClient), [httpClient]);
};

export default useCoursesService;
