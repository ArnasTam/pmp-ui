import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import CourseTagsService from 'src/services/course_tags_service';

const useCourseTagsService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new CourseTagsService(httpClient), [httpClient]);
};

export default useCourseTagsService;
