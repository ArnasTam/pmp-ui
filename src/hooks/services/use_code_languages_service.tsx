import { useMemo } from 'react';
import useHttpClient from 'src/hooks/services/use_http_client';
import CodeLanguagesService from 'src/services/code_languages.service';

const useCodeLanguagesService = () => {
  const httpClient = useHttpClient();
  return useMemo(() => new CodeLanguagesService(httpClient), [httpClient]);
};

export default useCodeLanguagesService;
