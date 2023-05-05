import { Challenge } from 'src/models/challenge';
import { ChallengeResponse } from 'src/models/http/challenges/challenge_response';
import { CreateChallengeRequest } from 'src/models/http/challenges/create_challenge_request';
import { ListResponse } from 'src/models/http/list_response';
import HttpClient from 'src/services/http_client';
import mapChallengeResponseToChallenge from 'src/services/mappers/challanges.mapper';

class ChallengesService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/challenges';
  }

  public async getChallanges(): Promise<Challenge[]> {
    const response = await this._httpClient.get<
      ListResponse<ChallengeResponse>
    >(this._endpoint);

    return response.data.map((data) => mapChallengeResponseToChallenge(data));
  }

  public async getChallengesByAuthorId(authorId: string): Promise<Challenge[]> {
    const response = await this._httpClient.get<
      ListResponse<ChallengeResponse>
    >(`${this._endpoint}?authorId=${authorId}`);

    return response.data.map((data) => mapChallengeResponseToChallenge(data));
  }

  public async getChallengeById(id: string): Promise<Challenge> {
    const response = await this._httpClient.get<ChallengeResponse>(
      `${this._endpoint}/${id}`,
    );

    return mapChallengeResponseToChallenge(response);
  }

  public async createChallenge(
    createCourseData: CreateChallengeRequest,
  ): Promise<Challenge> {
    return this._httpClient.post<Challenge>(this._endpoint, createCourseData);
  }

  public async updateChallenge(
    id: string,
    createCourseData: CreateChallengeRequest,
  ): Promise<Challenge> {
    return this._httpClient.put<Challenge>(
      `${this._endpoint}/${id}`,
      createCourseData,
    );
  }

  public async deleteChallenge(id: string): Promise<void> {
    return this._httpClient.delete(`${this._endpoint}/${id}`);
  }
}

export default ChallengesService;
