import CodeLanguage from 'src/models/code_language';
import CreateCodeLanguageRequest from 'src/models/http/code_languages/create_code_language_request';
import { ListResponse } from 'src/models/http/list_response';
import HttpClient from 'src/services/http_client';

class CodeLanguagesService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/code-languages';
  }

  public async getCodeLanguages(): Promise<CodeLanguage[]> {
    const { data } = await this._httpClient.get<ListResponse<CodeLanguage>>(
      this._endpoint,
    );
    return data;
  }

  public async createCodeLanguage(
    data: CreateCodeLanguageRequest,
  ): Promise<void> {
    await this._httpClient.post<ListResponse<CodeLanguage>>(this._endpoint, {
      ...data,
    });
  }

  public async updateCodeLanguage(
    id: string,
    data: CreateCodeLanguageRequest,
  ): Promise<void> {
    await this._httpClient.put<ListResponse<CodeLanguage>>(
      `${this._endpoint}/${id}`,
      {
        ...data,
      },
    );
  }

  public async deleteCodeLanguage(id: string): Promise<void> {
    await this._httpClient.delete(`${this._endpoint}/${id}`);
  }
}

export default CodeLanguagesService;
