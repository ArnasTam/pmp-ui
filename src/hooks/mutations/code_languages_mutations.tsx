import { useMutation } from '@tanstack/react-query';
import useCodeLanguagesService from 'src/hooks/services/use_code_languages_service';
import CreateCodeLanguageRequest from 'src/models/http/code_languages/create_code_language_request';

export const useCreateCodeLanguageMutation = () => {
  const codeLanguagesService = useCodeLanguagesService();

  return useMutation({
    mutationFn: (data: CreateCodeLanguageRequest) =>
      codeLanguagesService.createCodeLanguage(data),
  });
};

export const useUpdateCodeLanguageMutation = () => {
  const codeLanguagesService = useCodeLanguagesService();

  return useMutation({
    mutationFn: (data: {
      id: string;
      codeLanguage: CreateCodeLanguageRequest;
    }) => codeLanguagesService.updateCodeLanguage(data.id, data.codeLanguage),
  });
};

export const useDeleteCodeLanguageMutation = () => {
  const codeLanguagesService = useCodeLanguagesService();

  return useMutation({
    mutationFn: (id: string) => codeLanguagesService.deleteCodeLanguage(id),
  });
};
