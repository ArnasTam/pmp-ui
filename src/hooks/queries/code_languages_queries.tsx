import { useQuery } from '@tanstack/react-query';
import useCodeLanguagesService from 'src/hooks/services/use_code_languages_service';

enum CodeLanguagesQueryKeys {
  GET_CODE_LANGUAGES = 'get-code-languages',
}

const useGetCodeLanguagesQuery = () => {
  const codeLanguagesService = useCodeLanguagesService();

  return useQuery({
    queryKey: [CodeLanguagesQueryKeys.GET_CODE_LANGUAGES],
    queryFn: () => codeLanguagesService.getCodeLanguages(),
    refetchOnWindowFocus: false,
  });
};

export default useGetCodeLanguagesQuery;
